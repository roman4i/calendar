import { createPage as createEventPage } from './eventCreate';
import { createPage as createCalendarPage } from './calendar';
import goToPage from './navigation';

import './calendar/head/calendarHead.scss';
import './calendar/table/tableStyle.scss';
import './eventCreate/eventPage.scss';
import config from './config';

const personName = ['Igor', 'Oleg', 'Olga', 'Yaroslav', 'Anna'];
localStorage.setItem('nameList', JSON.stringify(personName));

window.onpopstate = () => {
  const routeToGo = Object.values(config.routes)
    .find((routeConfig) => window.location.pathname.includes(routeConfig.path));

  if (routeToGo) {
    goToPage(routeToGo.name);
  }

  if (window.location.pathname === '/create-event') {
    document.getElementById('calendarDivCont').remove();
  }
  if (window.location.pathname === '/calendar') {
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

goToPage(config.routeNames.calendar);
