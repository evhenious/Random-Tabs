class ProgressBar {
  #root;

  constructor(rootId = '') {
    this.#root = document.getElementById(rootId);
  }

  /**
   * @param {number} width in percents
   */
  setLength(width = 0) {
    this.#root.style.width = `${Math.min(width, 100)}%`;
  }
}

export default ProgressBar;
