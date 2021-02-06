export default function navigation(pathname, route) {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );
  route[pathname]();
}
