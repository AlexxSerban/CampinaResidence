/**
 * Site Configuration
 * This file contains configuration settings for the website
 */

// Determine if we're on GitHub Pages by checking the hostname
const isGitHubPages = window.location.hostname.includes('github.io');

// Set the base URL depending on the environment
const baseUrl = isGitHubPages ? '/CampinaResidence' : '';

// Export the configuration
window.siteConfig = {
  baseUrl: baseUrl,
  
  // Helper function to get full URL for a path
  getUrl: function(path) {
    // Make sure path starts with a slash
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    return this.baseUrl + path;
  }
};

console.log('Site configuration loaded. Base URL:', window.siteConfig.baseUrl); 