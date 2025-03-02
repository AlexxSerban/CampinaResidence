/**
 * Script to update all HTML files with the site configuration
 * 
 * This script should be run once to update all HTML files in the project
 * to include the site configuration script.
 */

const fs = require('fs');
const path = require('path');

// Function to find all HTML files in a directory
function findHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && file !== 'node_modules' && file !== '.git') {
      findHtmlFiles(filePath, fileList);
    } else if (path.extname(file) === '.html') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to update an HTML file to include the configuration script
function updateHtmlFile(filePath) {
  console.log(`Updating ${filePath}...`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if the file already includes the configuration
  if (content.includes('js/config.js')) {
    console.log(`  Already updated, skipping.`);
    return;
  }
  
  // Determine the relative path to the config.js file
  const relativePath = path.relative(path.dirname(filePath), '.');
  const configPath = path.join(relativePath, 'js/config.js').replace(/\\/g, '/');
  
  // Add the configuration script after the charset meta tag
  const headRegex = /<head>[\s\S]*?<meta[^>]*charset[^>]*>/i;
  const headMatch = content.match(headRegex);
  
  if (headMatch) {
    const scriptTag = `\n    <!-- Load site configuration -->\n    <script src="${configPath}"></script>`;
    content = content.replace(headRegex, headMatch[0] + scriptTag);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  Updated successfully.`);
  } else {
    console.log(`  Could not find head section, skipping.`);
  }
}

// Main function
function main() {
  const rootDir = '.';
  const htmlFiles = findHtmlFiles(rootDir);
  
  console.log(`Found ${htmlFiles.length} HTML files to update.`);
  
  htmlFiles.forEach(file => {
    updateHtmlFile(file);
  });
  
  console.log('Update complete.');
}

// Run the script
main(); 