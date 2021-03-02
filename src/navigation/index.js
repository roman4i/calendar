import config from '../config';

export const basePathname = '/internship-test-task';

const goToPage = (routeName) => {
  const route = config.routes[routeName];

  window.history.pushState({}, routeName, window.location.origin + basePathname + route.path);

  const event = new CustomEvent('pushStateChanged', {
    detail: {
      route,
    },
  });

  document.dispatchEvent(event);
};

export default goToPage;
