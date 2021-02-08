import innerEventCell from '../table/insertEvent';
import createTable from '../table/table';

export default function createCalendarHead(navFunc, routeArr) {
  function clearTable() {
    document.getElementById('tableCont').remove();
    createTable();
  }

  const headDiv = document.createElement('div');
  headDiv.id = 'calendarContainer';
  headDiv.classList = 'headStyle';

  const headText = document.createElement('div');
  headText.innerText = 'Calendar';
  headText.classList = 'headText';
  headDiv.append(headText);

  const eventDiv = document.createElement('div');
  eventDiv.classList = 'eventContainer';
  headDiv.append(eventDiv);

  const personList = document.createElement('select');
  personList.id = 'personSelect';
  personList.classList = 'personSelect';
  eventDiv.append(personList);

  // Members list inner
  const namesList = JSON.parse(localStorage.getItem('nameList'));
  const optionAllPersons = document.createElement('option');
  optionAllPersons.value = 0;
  optionAllPersons.text = 'All members';
  optionAllPersons.onclick = () => {
    clearTable();
    innerEventCell('all');
  };
  personList.add(optionAllPersons);
  namesList.forEach((element, index) => {
    const nameOption = document.createElement('option');
    nameOption.value = index + 1;
    nameOption.text = element;
    nameOption.onclick = () => {
      clearTable();
      innerEventCell('single', element);
    };
    personList.add(nameOption);
  });

  const newEventBtn = document.createElement('input');
  newEventBtn.id = 'createEvent';
  newEventBtn.type = 'button';
  newEventBtn.value = 'New event +';
  newEventBtn.classList = 'newEvent';
  newEventBtn.onclick = () => {
    navFunc('/create-event', routeArr);
    document.getElementById('calendarDivCont').remove();
  };

  eventDiv.append(newEventBtn);

  document.getElementById('calendarDivCont').append(headDiv);
}
