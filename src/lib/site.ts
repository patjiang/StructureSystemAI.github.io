export const SITE_NAME = "Systems Structural Biology Group";

export const footerLinks = [
  { label: "People", path: "/people" },
  { label: "Publications", path: "/publications" },
  { label: "Site Map", path: "/site-map" },
  { label: "Join", path: "/join" },
  { label: "Contact", path: "/contact" },
];

export const navLinkDefs = [
  { label: "Home", path: "/" },
  { label: "People", path: "/people" },
  { label: "Research", path: "/research" },
  { label: "Projects", path: "/projects" },
  { label: "Publications", path: "/publications" },
  { label: "News", path: "/news" },
  { label: "Site Map", path: "/site-map" },
  { label: "Join", path: "/join" },
  { label: "Contact", path: "/contact" },
];

export const normalizeBase = (base = "/") => (base.endsWith("/") ? base : `${base}/`);

export const withBase = (base = "/", path = "") => {
  if (!path) return "";
  if (/^(https?:)?\/\//.test(path) || path.startsWith("mailto:") || path.startsWith("#")) return path;
  const normalizedBase = normalizeBase(base);
  const cleaned = path.startsWith("/") ? path.slice(1) : path;
  return `${normalizedBase}${cleaned}`;
};

export const uploadPath = (base = "/", file = "") => {
  if (!file) return "";
  if (/^(https?:)?\/\//.test(file) || file.startsWith("mailto:")) return file;
  const normalized = file.startsWith("/uploads/")
    ? file
    : file.startsWith("uploads/")
      ? `/${file}`
      : `/uploads/${file}`;
  return withBase(base, normalized);
};

export const stripBase = (base = "/", path = "") => {
  if (base !== "/" && path.startsWith(base)) {
    return path.slice(base.length - 1);
  }
  return path;
};

export const isActiveHref = (base = "/", pathname = "/", href = "/") => {
  const localPath = stripBase(base, pathname);
  const localHref = stripBase(base, href);
  return localHref === "/" ? localPath === "/" : localPath.startsWith(localHref);
};
