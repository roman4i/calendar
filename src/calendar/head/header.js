export default function createCalendarHead() {
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

  const newEventBtn = document.createElement('input');
  newEventBtn.type = 'button';
  newEventBtn.value = 'New event +';
  newEventBtn.classList = 'newEvent';

  eventDiv.append(newEventBtn);

  document.getElementById('root').append(headDiv);
}
