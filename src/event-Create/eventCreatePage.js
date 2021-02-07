import processData from './generateEventData';

export default function createEventPage(navFunc, routeArr) {
  const eventDiv = document.createElement('div');
  eventDiv.id = 'createEventDiv';
  eventDiv.classList = 'eventDivStyle';

  const eventNameDiv = document.createElement('div');
  eventNameDiv.classList = 'eventOptionDiv';

  const nameDivCont = document.createElement('div');
  nameDivCont.insertAdjacentText('afterbegin', 'Name of the event:');
  nameDivCont.classList = 'optionText';
  eventNameDiv.append(nameDivCont);

  // Text input for event name
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'nameField';
  nameInput.classList = 'selectionEvent';
  eventNameDiv.append(nameInput);

  eventDiv.append(eventNameDiv);

  function createEventOption(text, optionId, data, multiple) {
    const optionDiv = document.createElement('div');
    optionDiv.classList = 'eventOptionDiv';

    const optionTextDiv = document.createElement('div');
    optionTextDiv.insertAdjacentText('afterbegin', text);
    optionTextDiv.classList = 'optionText';
    optionDiv.append(optionTextDiv);

    const optionSelection = document.createElement('select');
    optionSelection.id = optionId;
    optionSelection.multiple = multiple;
    optionSelection.classList = 'selectionEvent';

    data.forEach((item, number) => {
      const option = document.createElement('option');
      option.value = number;
      option.text = item;
      optionSelection.add(option);
    });

    optionDiv.append(optionSelection);
    eventDiv.append(optionDiv);
  }

  const persons = JSON.parse(localStorage.getItem('nameList'));
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeList = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  createEventOption('Participants:', 'choosePerson', persons, true);
  createEventOption('Day:', 'daySelect', days, false);
  createEventOption('Time:', 'timeSelect', timeList, false);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList = 'buttonsStyle';

  const cancelBut = document.createElement('input');
  cancelBut.type = 'button';
  cancelBut.id = 'cancelEventCreate';
  cancelBut.value = 'Cancel';
  cancelBut.classList = 'eventButton cancelButton';
  cancelBut.onclick = () => {
    navFunc('/calendar', routeArr);
    eventDiv.remove();
    if (document.getElementById('errorContent') != null) {
      document.getElementById('errorContent').remove();
    }
  };
  buttonsDiv.append(cancelBut);

  // Create button init
  const createBut = document.createElement('input');
  createBut.type = 'button';
  createBut.value = 'Create';
  createBut.classList = 'eventButton';
  createBut.onclick = () => {
    const succes = processData();
    if (succes) {
      navFunc('/calendar', routeArr);
      eventDiv.remove();
    }
  };
  buttonsDiv.append(createBut);

  eventDiv.append(buttonsDiv);
  document.getElementById('root').append(eventDiv);
}
