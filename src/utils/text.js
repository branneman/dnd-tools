/**
 * Creates a url-safe 'slug' of a string
 * @example slug("Alchemist's Fire (flask)"") => 'alchemist-s-fire-flask'
 * @param {String} str
 * @returns {String}
 */
export function slug(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9-]/gi, '-') // replace non a-z and dash
    .replace(/\-{2,}/gi, '-') // replace multiple dashes
    .replace(/^\-/gi, '') // remove leading dash
    .replace(/\-$/gi, '') // remove trailing dash
}

/**
 *
 * @param {String} str
 * @param {Number} len
 * @returns {String}
 */
export function ellipsify(str, len, ellipsis = '…') {
  if (str.length <= len) return str
  return str.substr(0, len - ellipsis.length) + ellipsis
}
