const routeNames = {
  calendar: 'calendar',
  createEvent: 'createEvent',
};

const routes = {
  [routeNames.calendar]: {
    name: routeNames.calendar,
    path: '/calendar',
  },
  [routeNames.createEvent]: {
    name: routeNames.createEvent,
    path: '/create-event',
  },
};

const config = {
  routeNames,
  routes,
};

export default config;
