# Campina Residence Website

## GitHub Pages Deployment Guide

This project is configured to work both locally and when deployed to GitHub Pages. The site uses a configuration system to handle the different base URLs between environments.

### How it works

1. **Base URL Configuration**: The site uses a configuration file (`js/config.js`) that automatically detects whether the site is running on GitHub Pages or locally, and sets the base URL accordingly.

2. **Link Processing**: All links in the navbar and footer are processed using the configuration to ensure they work in both environments.

3. **Image Paths**: Image paths are also processed to ensure they work in both environments.

### Updating the site

When adding new pages or components, follow these guidelines:

1. **HTML Files**: Make sure all HTML files include the configuration script:
   ```html
   <!-- Load site configuration -->
   <script src="../js/config.js"></script>
   ```
   (Adjust the path as needed based on the file's location)

2. **Links**: In components like the navbar, use `data-href` attributes instead of direct `href` attributes:
   ```html
   <a href="#" data-href="/path/to/page.html">Link Text</a>
   ```

3. **Images**: In components, use `data-src` attributes instead of direct `src` attributes:
   ```html
   <img src="#" data-src="/images/image.jpg" alt="Image Alt">
   ```

4. **JavaScript**: When creating links or loading resources dynamically, use the `window.siteConfig.getUrl()` function:
   ```javascript
   const url = window.siteConfig.getUrl('/path/to/resource');
   ```

### Running the update script

If you need to update all HTML files in the project to include the configuration script, you can run:

```
node js/update-paths.js
```

This will scan all HTML files and add the configuration script if it's not already present.

### Testing

Always test your changes both locally and on GitHub Pages to ensure everything works correctly in both environments.

## Local Development

To run the site locally, you can use any local server, such as the Live Server extension for VS Code.

## GitHub Pages Deployment

The site is configured to be deployed to GitHub Pages at the URL: https://alexxserban.github.io/CampinaResidence/

When pushing changes to GitHub, the site will automatically be deployed to this URL. 