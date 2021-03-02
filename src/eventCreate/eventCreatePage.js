import processData from './generateEventData';
import goToPage from '../navigation';
import config from '../config';
import { createDOMElement } from '../utils';
import innerEventCell from '../calendar/table/insertEvent';

let selectedNamesList = [];

export default function createEventPage() {
  const eventDiv = createDOMElement({
    tagName: 'div',
    id: 'createEventDiv',
    classList: 'eventDivStyle',
  });

  const eventNameDiv = createDOMElement({
    tagName: 'div',
    classList: 'eventOptionDiv',
  });

  const nameDivCont = createDOMElement({
    tagName: 'div',
    classList: 'optionText',
  });
  nameDivCont.insertAdjacentText('afterbegin', 'Name of the event:');
  eventNameDiv.append(nameDivCont);

  // Text input for event name
  const nameInput = createDOMElement({
    tagName: 'input',
    id: 'nameField',
    type: 'text',
    classList: 'selectionEvent',
  });
  eventNameDiv.append(nameInput);

  eventDiv.append(eventNameDiv);

  function createEventOption(text, optionId, data) {
    const optionDiv = document.createElement('div');
    optionDiv.classList = 'eventOptionDiv';

    const optionTextDiv = document.createElement('div');
    optionTextDiv.insertAdjacentText('afterbegin', text);
    optionTextDiv.classList = 'optionText';
    optionDiv.append(optionTextDiv);

    const optionSelection = document.createElement('select');
    optionSelection.id = optionId;
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

  function createEventPersons(text, optionId, data) {
    const optionDiv = document.createElement('div');
    optionDiv.classList = 'eventOptionDiv';

    const optionTextDiv = createDOMElement({
      tagName: 'div',
      innerText: text,
      classList: 'optionText',
    });
    optionDiv.append(optionTextDiv);

    const optionSelection = createDOMElement({
      tagName: 'select',
      id: optionId,
      classList: 'selectionEvent',
    });
    const selectedNames = createDOMElement({
      tagName: 'option',
      text: 'Select names',
    });
    optionSelection.add(selectedNames);

    data.forEach((item, number) => {
      const option = createDOMElement({
        tagName: 'option',
        value: number + 1,
        text: item,
      });
      optionSelection.add(option);
    });

    optionSelection.onchange = () => {
      if (selectedNamesList[0] !== undefined) {
        let noIdents = true;
        for (let i = selectedNamesList.length; i >= 0; i -= 1) {
          if (optionSelection.options[optionSelection.selectedIndex].text === selectedNamesList[i]) {
            selectedNamesList.splice(i, 1);
            noIdents = false;
            selectedNames.text = selectedNamesList.reduce((prevVal, item) => {
              let prevBuf = prevVal;
              prevBuf += `,${item}`;
              return prevBuf;
            });
          }
        }
        if (noIdents) {
          selectedNamesList.push(optionSelection.options[optionSelection.selectedIndex].text);
          selectedNames.text = selectedNamesList.reduce((prevVal, item) => {
            let prevBuf = prevVal;
            prevBuf += `,${item}`;
            return prevBuf;
          });
        }
        optionSelection.selectedIndex = '0';
      } else {
        selectedNamesList.push(optionSelection.options[optionSelection.selectedIndex].text);
        selectedNames.text = selectedNamesList.reduce((prevVal, item) => {
          let prevBuf = prevVal;
          prevBuf += `,${item}`;
          return prevBuf;
        });
      }
    };

    optionDiv.append(optionSelection);
    eventDiv.append(optionDiv);
  }

  const persons = JSON.parse(localStorage.getItem('nameList'));
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeList = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
  createEventPersons('Participants:', 'choosePerson', persons);
  createEventOption('Day:', 'daySelect', days);
  createEventOption('Time:', 'timeSelect', timeList);

  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList = 'buttonsStyle';

  const cancelBut = document.createElement('input');
  cancelBut.type = 'button';
  cancelBut.id = 'cancelEventCreate';
  cancelBut.value = 'Cancel';
  cancelBut.classList = 'eventButton cancelButton';
  cancelBut.onclick = () => {
    goToPage(config.routeNames.calendar);
    eventDiv.remove();
    if (document.getElementById('errorContent') != null) {
      document.getElementById('errorContent').remove();
    }
    innerEventCell('all');
  };
  buttonsDiv.append(cancelBut);

  // Create button init
  const createBut = document.createElement('input');
  createBut.type = 'button';
  createBut.value = 'Create';
  createBut.classList = 'eventButton';
  createBut.onclick = async () => {
    const success = processData();
    if (success) {
      goToPage(config.routeNames.calendar);
      await innerEventCell('all');
      eventDiv.remove();
    }
  };
  selectedNamesList = [];

  buttonsDiv.append(createBut);

  eventDiv.append(buttonsDiv);
  document.getElementById('root').append(eventDiv);
}
