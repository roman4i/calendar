import createCalendarHead from './head/header';
import createTable from './table/table';
// import innerEventCell from './table/insertEvent';
import { createDOMElement } from '../utils';

export default function createCalendarPage() {
  const calendarDiv = createDOMElement({
    tagName: 'div',
    id: 'calendarDivCont',
    classList: 'calendarDiv',
  });

  document.getElementById('root').append(calendarDiv);

  createCalendarHead(calendarDiv);
  createTable();
  // innerEventCell('all');
}
