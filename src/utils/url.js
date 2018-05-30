/**
 * PORT is only defined on the server
 */
const currentApiVersion = "/api/v1";
const proxyPrefix = "/p";

const BASE =
  typeof window === "undefined" ? `http://localhost:${process.env.PORT}` : "";

export function addPrefix(path, isApi = false) {
  return `${isApi ? currentApiVersion : proxyPrefix}${path}`;
}

export function formatUrl(path, isApi = false) {
  return `${BASE}${addPrefix(path, isApi)}`;
}

export function fullUrl(path, isApi = false) {
  return `${window.location.origin}${addPrefix(path, isApi)}`;
}

export function humanizeProImageLink(st) {
  var frag = st.split(" ");
  var i = 0;
  for (i = 0; i < frag.length; i++) {
    frag[i] = frag[i].charAt(0).toLowerCase() + frag[i].slice(1);
  }
  return frag.join("_");
}

export function getProImageLinkFromDisplayName(profileDisplayName) {
  return `https://s3.amazonaws.com/solomid-resources/fnelite/players/${humanizeProImageLink(
    profileDisplayName
  ).toLowerCase()}_122x72.png`;
}
