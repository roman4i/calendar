import navigation from './navigation/navigation';
import createCalendarPage from './calendar/calendar';
import createEventPage from './event-Create/eventCreatePage';

import './calendar/head/calendarHead.scss';
import './calendar/table/tableStyle.scss';
import './event-Create/eventPage.scss';

const routes = {
  '/calendar': createCalendarPage,
  '/create-event': () => {
    createEventPage(navigation, routes);
  },
};

navigation('/calendar', routes);

document.getElementById('createEvent').onclick = () => {
  document.getElementById('calendarContainer').remove();
  document.getElementById('tableCont').remove();
  navigation('/create-event', routes);
};
