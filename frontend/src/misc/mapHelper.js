/**
 * Receives lat/lng coords and returns iframe with point on map
 *
 * @param {Object} params
 * @param {string} params.lat
 * @param {string} params.lng
 *
 * @returns {HTMLIFrameElement}
 */
function getMapIframe({ lat, lng }) {
  const left = lng - 20;
  const top = +lat + 20;
  const right = +lng + 20;
  const bottom = +lat - 20;

  const params = new URLSearchParams();
  params.set('bbox', `${left},${top},${right},${bottom}`);
  params.set('layer', 'mapnik');
  params.set('marker', `${lat},${lng}`);

  const frame = document.createElement('iframe');
  frame.setAttribute('width', 600);
  frame.setAttribute('height', 350);
  frame.src = `https://www.openstreetmap.org/export/embed.html?${params}`;

  return frame;
}

export { getMapIframe };
