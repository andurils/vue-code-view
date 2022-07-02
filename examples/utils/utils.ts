import { ref } from "vue";

export const hashRE = /#.*$/;
export const extRE = /(index)?\.(md|html)$/;
export const outboundRE = /^[a-z]+:/i;
export const EXTERNAL_URL_RE = /^https?:/i;

export function isExternal(path: string): boolean {
  return outboundRE.test(path);
}

/**
 * Join two paths by resolving the slash collision.
 */
export function joinPath(base: string, path: string): string {
  return `${base}${path}`.replace(/\/+/g, "/");
}

// export const siteDataRef: Ref<SiteData> = shallowRef(parse(serializedSiteData))
// function parse(data: string): SiteData {
//   const parsed = JSON.parse(data)
//   return (import.meta.env.DEV ? readonly(parsed) : parsed) as SiteData
// }

export function withBase(path: string) {
  return EXTERNAL_URL_RE.test(path) ? path : joinPath("http://vuejs.org", path);
}

export function normalizeLink(url: string): string {
  if (isExternal(url)) {
    return url;
  }
  const { pathname, search, hash } = new URL(url, "http://vuejs.org");
  return withBase(
    pathname.endsWith("/") || pathname.endsWith(".html")
      ? url
      : `${pathname.replace(/(\.md)?$/, ".html")}${search}${hash}`
  );
}

const inBrowser = typeof window !== "undefined";
const hashRef = ref(inBrowser ? location.hash : "");

if (inBrowser) {
  window.addEventListener("hashchange", () => {
    hashRef.value = location.hash;
  });
}

export function isActive(
  currentPath: string,
  matchPath?: string,
  asRegex = false
): boolean {
  if (matchPath === undefined) {
    return false;
  }
  currentPath = normalize(`/${currentPath}`);
  if (asRegex) {
    return new RegExp(matchPath).test(currentPath);
  } else {
    if (normalize(matchPath) !== currentPath) {
      return false;
    }
    const hashMatch = matchPath.match(hashRE);
    if (hashMatch) {
      return hashRef.value === hashMatch[0];
    }
    return true;
  }
}

export function normalize(path: string): string {
  return decodeURI(path).replace(hashRE, "").replace(extRE, "");
}
