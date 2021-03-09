import innerEventCell from '../table/insertEvent';
import createTable from '../table/table';
import goToPage from '../../navigation';
import config from '../../config';
import { createDOMElement } from '../../utils';
import StaticStorage from '../../static-data';

const createPeopleOptions = () => {
  const importStorage = StaticStorage.getInstance();
  const namesList = importStorage.getNames();

  return [
    {
      value: 0,
      text: 'All members',
    },
    ...namesList.map((name, index) => ({ value: index + 1, text: name })),
  ];
};

export default function createCalendarHead(contentElement) {
  function clearTable() {
    document.getElementById('tableCont').remove();
    createTable();
  }

  const peopleSelect = createDOMElement({
    tagName: 'select',
    id: 'personSelect',
    classList: 'personSelect',
    selectOptions: createPeopleOptions(),
    onchange: () => {
      if (peopleSelect.options.selectedIndex === 0) {
        clearTable();
        innerEventCell('all');
      } else {
        clearTable();
        const selectedItem = peopleSelect.options.selectedIndex;
        innerEventCell('single', peopleSelect.options[selectedItem].text);
      }
    },
  });

  const headDiv = createDOMElement({
    tagName: 'div',
    id: 'calendarContainer',
    classList: 'headStyle',
    children: [
      createDOMElement({
        tagName: 'div',
        innerText: 'Calendar',
        classList: 'headText',
      }),
      createDOMElement({
        tagName: 'div',
        classList: 'eventContainer',
        children: [
          peopleSelect,
          createDOMElement({
            tagName: 'input',
            id: 'createEvent',
            type: 'button',
            value: 'New event +',
            classList: 'newEvent',
            onclick: () => {
              goToPage(config.routeNames.createEvent);
              contentElement.remove();
            },
          }),
        ],
      }),
    ],
  });

  contentElement.append(headDiv);
}
