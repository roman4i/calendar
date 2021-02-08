import createCalendarHead from './head/header';
import createTable from './table/table';
import innerEventCell from './table/insertEvent'

export default function createCalendarPage(navFunc, routeArr) {
  const calendarDiv = document.createElement('div');
  calendarDiv.id = 'calendarDivCont';
  calendarDiv.classList = 'calendarDiv';

  document.getElementById('root').append(calendarDiv);

  createCalendarHead(navFunc, routeArr);
  createTable();
  innerEventCell('all');
}
