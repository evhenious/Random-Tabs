const CONSOLE_TITLE_STYLES = [
  'color:darkorange',
  'font-size: 14px;',
  'text-decoration: underline;',
].join(';');

/**
 * Minimal common setup for title and console
 *
 * @param {string} name lesson name
 * @param {string} consoleDescription
 */
function initAppTitle(name, consoleDescription) {
  document.getElementById('main-title').innerText = name;
  console.log(`# %c ${consoleDescription}`, CONSOLE_TITLE_STYLES);
}

export {
  initAppTitle
};
