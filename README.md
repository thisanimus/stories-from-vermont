# Randolph County Public Library
This is a static site build powered by eleventy. The compiled site is in `/_site`, don't touch these files.  Everything else is fair game.  The base pages are the `.html` files in the project root.

## Prerequisites
### Node
You will need to install Node.js to run eleventy.  I recommend you use (NVM)[https://github.com/nvm-sh/nvm] to install/manage Node on your machine. Install NVM via the instruction in the repo, and then use nvm to install the latest version of Node.

## Installation
Install the dev environment build tools:
`npm i`

## Development

`npm run start`
This starts a browsersync session and hot-reloads the site in-browser when you edit a source file.

### Assets
In the project root, you'll find a dir `/assets` these files are copied into `/_site` whenever source file is changed.  Responsive images are generated on-the-fly, and we want to keep them separate from the source images.  

### Style
SCSS files are in `/sass`

### Images
Put any images you need in `/assets/img/`.  Use them in the templates via the shortcode: `{% image  'filename.jpg', 'alt text describing the image', 'special-classname' %}`
