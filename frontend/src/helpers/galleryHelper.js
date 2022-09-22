/**
 * Parses link header to separate navigation links
 * @param {string} links
 * @returns {{ prev?: string, next?: string }}
 */
function parseNavDirections(links) {
  const linksArray = links.split(',');
  const pageLinks = {};
  /*
    Each link contains URL and direction type (prev or next):
    <https://picsum.photos/v2/list?page=1&limit=10>; rel="prev"
    <https://picsum.photos/v2/list?page=3&limit=10>; rel="next"
  */
  linksArray.forEach((link) => {
    // we need to find and cut out DIRECTION (prev | next)
    const dirStart = link.indexOf('"') + 1;
    const dirEnd = link.lastIndexOf('"');
    const direction = link.slice(dirStart, dirEnd);

    // and we need to cut out URL of that direction
    const urlStart = link.indexOf('<') + 1;
    const urlEnd = link.indexOf('>');
    const url = link.slice(urlStart, urlEnd);

    pageLinks[direction] = url;
  });

  return pageLinks;
}

/**
 * Transforms image object returned from Lorem Picsum to the format our Gallery expects
 *
 * @param {Object} img
 * @returns {{ original: string, preview: string }}
 */
function transformImageUrls(img) {
  //? here, we use regex to replace original image resolution and create small preview
  //? https://picsum.photos/id/0/ 5616/3744 => https://picsum.photos/id/0/ 330/330
  const preview = img.download_url.replace(/\d{1,4}\/\d{1,4}$/, '330/330');

  return {
    original: img.download_url,
    preview,
  };
}

export { parseNavDirections, transformImageUrls };
