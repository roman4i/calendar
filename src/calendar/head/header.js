export default function createCalendarHead(navFunc, routeArr) {
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
