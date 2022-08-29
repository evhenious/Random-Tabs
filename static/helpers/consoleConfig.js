const CONSOLE_TITLE_STYLES = [
  'color:darkorange',
  'font-size: 14px;',
  'text-decoration: underline;',
].join(';');

/**
 * Minimal common setup for a current lesson page/console
 *
 * @param {string} name lesson name
 * @param {string} consoleDescription
 */
function initLesson(name, consoleDescription) {
  document.getElementById('lesson-title').innerText = name;
  console.log(`# %c ${consoleDescription}`, CONSOLE_TITLE_STYLES);
}

export {
  initLesson
};
