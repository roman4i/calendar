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
  personList.add(optionAllPersons);

  namesList.forEach((element, index) => {
    const nameOption = document.createElement('option');
    nameOption.value = index + 1;
    nameOption.text = element;
    personList.add(nameOption);
  });

  personList.onchange = () => {
    if (personList.options.selectedIndex == 0) {
      clearTable();
      innerEventCell('all');
    } else {
      clearTable();
      const selectedItem = personList.options.selectedIndex;
      innerEventCell('single', personList.options[selectedItem].text);
    }
  };

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
