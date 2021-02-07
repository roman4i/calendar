import navigation from './navigation/navigation';
import createCalendarPage from './calendar/calendar';

import './calendar/head/calendarHead.scss';
import './calendar/table/tableStyle.scss';

const routes = {
  '/calendar': createCalendarPage,
  '/create-event': createEventPage,
};

document.body.onload = () => {
  navigation('/calendar', routes);
};

document.getElementById('createEvent').onclick = () => {
  navigation('/create-event', routes);
};
