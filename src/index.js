import navigation from './navigation/navigation';
import createCalendarPage from './calendar/calendar';
import createEventPage from './event-Create/eventCreatePage';

import './calendar/head/calendarHead.scss';
import './calendar/table/tableStyle.scss';
import './event-Create/eventPage.scss';

const routes = {
  '/calendar': () => {
    createCalendarPage(navigation, routes);
  },
  '/create-event': () => {
    createEventPage(navigation, routes);
  },
};

window.onpopstate = () => {
  navigation(window.location.pathname, routes);
  if (window.location.pathname === '/create-event') {
    document.getElementById('calendarDivCont').remove();
  }
  if (window.location.pathname === '/calendar') {
    document.getElementById('createEventDiv').remove();
  }
};

navigation('/calendar', routes);
