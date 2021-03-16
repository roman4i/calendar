import ErrorFactory from './eventCreateEror';
import APICommunication from '../api-functions';

const communicate = new APICommunication();

function parseInpuEvents(eventsList, bookingCell) {
  const eventDataArray = eventsList.data.map((item) => JSON.parse(item.data));
  let bookedState = false;
  eventDataArray.forEach((element) => {
    if (element[Object.keys(element)[0]].cell === bookingCell) {
      bookedState = true;
    }
  });
  return bookedState;
}

export default async function processData() {
  let returnVal = true;
  const eventObject = {};
  eventObject.participiants = [];
  let errors = false;

  const nameParam = document.getElementById('nameField').value;
  if (nameParam !== '') {
    eventObject.name = nameParam;
    const participantsString = document.getElementById('choosePerson').item(0).text;
    const participantsSelected = participantsString.split(',');
    if (participantsSelected[0] !== 'Select names') {
      eventObject.participiants = [...participantsSelected];
    } else {
      if (!errors) {
        document.getElementById('root').prepend(new ErrorFactory('participants'));
      }
      errors = true;
      returnVal = false;
    }
  } else {
    document.getElementById('root').prepend(new ErrorFactory('name'));
    errors = true;
    returnVal = false;
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

    const event = await communicate.getEvents();
    const booked = parseInpuEvents(event, cell);
    if (!booked) {
      const currentEvent = {};
      currentEvent[eventObject.name] = {};
      currentEvent[eventObject.name].participiants = eventObject.participiants;
      currentEvent[eventObject.name].day = eventObject.day;
      currentEvent[eventObject.name].time = eventObject.time;
      currentEvent[eventObject.name].cell = cell;

      communicate.sendEvent(JSON.stringify(currentEvent));
    } else {
      document.getElementById('root').prepend(new ErrorFactory('booked'));
      returnVal = false;
    }
  }
  return returnVal;
}
