import { createPage as createEventPage } from './eventCreate';
import { createPage as createCalendarPage } from './calendar';
import goToPage, { basePathname } from './navigation';
import authShow from './calendar/auth/authScript';

import './calendar/head/calendarHead.scss';
import './calendar/table/tableStyle.scss';
import './eventCreate/eventPage.scss';
import config from './config';

localStorage.setItem('currentUser', 'none');

window.onpopstate = () => {
  const routeToGo = Object.values(config.routes)
    .find((routeConfig) => window.location.pathname.includes(routeConfig.path));

  if (routeToGo) {
    goToPage(routeToGo.name);
  }

  if (window.location.pathname === `${basePathname}${config.routes[config.routeNames.createEvent].path}`) {
    document.getElementById('calendarDivCont').remove();
  }
  if (window.location.pathname === `${basePathname}${config.routes[config.routeNames.calendar].path}`) {
    document.getElementById('createEventDiv').remove();
  }
};

document.addEventListener('pushStateChanged', (event) => {
  const { route } = event.detail;

  switch (route.name) {
    case config.routeNames.calendar:
      createCalendarPage();
      break;
    case config.routeNames.createEvent:
      createEventPage();
      break;
    default:
      break;
  }
});

authShow();
goToPage(config.routeNames.calendar);
