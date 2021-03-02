import creationError from './eventCreateEror';
import { sendEvent } from '../api-functions';

export default function processData() {
  const eventObject = {};
  eventObject.participiants = [];
  let errors = false;

  const nameParam = document.getElementById('nameField').value;
  if (nameParam !== '') {
    eventObject.name = nameParam;
    const participantsString = document.getElementById('choosePerson').item(0).text;
    const participantsSelected = participantsString.split(',');
    if (participantsSelected.length > 0) {
      eventObject.participiants = [...participantsSelected];
    } else {
      if (!errors) {
        document.getElementById('root').prepend(creationError('participants'));
      }
      errors = true;
    }
  } else {
    document.getElementById('root').prepend(creationError('name'));
    errors = true;
  }
  if (!errors) {
    eventObject.day = document.getElementById('daySelect').selectedOptions[0].label;
    eventObject.time = document.getElementById('timeSelect').selectedOptions[0].label;
    let dayPos;
    let timePos;

    const timeList = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
    timeList.forEach((timeValue, index) => {
      if (eventObject.time === timeValue) {
        timePos = index + 1;
      }
    });

    const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    daysList.forEach((dayVal, index) => {
      if (eventObject.day === dayVal) {
        dayPos = index + 1;
      }
    });

    const cell = timePos * 6 + dayPos + 1;

    let booked = false;
    const globalEventList = JSON.parse(localStorage.getItem('eventsStorage'));
    Object.values(globalEventList).forEach((event) => {
      if (event.cell === cell) {
        document.getElementById('root').prepend(creationError('booked'));
        booked = true;
      }
    });
    if (!booked) {
      const currentEvent = {};
      currentEvent[eventObject.name] = {};
      currentEvent[eventObject.name].participiants = eventObject.participiants;
      currentEvent[eventObject.name].day = eventObject.day;
      currentEvent[eventObject.name].time = eventObject.time;
      currentEvent[eventObject.name].cell = cell;

      (async () => { await sendEvent(JSON.stringify(currentEvent)); })();
      if (document.getElementById('errorContent') != null) {
        document.getElementById('errorContent').remove();
      }
      return true;
    }
  } else {
    return false;
  }
}
