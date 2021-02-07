import creationError from './eventCreateEror';

export default function processData() {
  const eventObject = {};
  eventObject.participiants = [];
  let errors = false;

  const nameParam = document.getElementById('nameField').value;
  if (nameParam !== '') {
    eventObject.name = nameParam;
    const participantsSelected = document.getElementById('choosePerson').selectedOptions;
    if (participantsSelected.length > 0) {
      const getSelectCollection = participantsSelected;
      for (let i = 0; i < getSelectCollection.length; i++) {
        eventObject.participiants.push(getSelectCollection[i].label);
      }
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
    let cell;

    const timeList = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
    timeList.forEach((timeValue, index) => {
      if (eventObject.time === timeValue) {
        timePos = index + 1;
      }
    });

    const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    daysList.forEach( (dayVal, index) => {
      if (eventObject.day === dayVal) {
        dayPos = index + 1;
      }
    });

    cell = timePos * 6 + dayPos + 1;

    let booked = false;
    let globalEventList = JSON.parse(localStorage.getItem('eventsStorage'));
    if (globalEventList != null) {
      for (let key in globalEventList) {
        if (globalEventList[key].cell === cell) {
          document.getElementById('root').append(creationError('booked'));
          booked = true;
        }
      }
      if (!booked) {
        globalEventList[eventObject.name] = {};
        globalEventList[eventObject.name].participiants = eventObject.participiants;
        globalEventList[eventObject.name].day = eventObject.day;
        globalEventList[eventObject.name].time = eventObject.time;
        globalEventList[eventObject.name].cell = cell;

        localStorage.setItem('eventsStorage', JSON.stringify(globalEventList));
        if (document.getElementById('errorContent') != null) {
          document.getElementById('errorContent').remove();
        }
        return true;
      }
    } else {
      globalEventList = {};
      globalEventList[eventObject.name] = {};
      globalEventList[eventObject.name].participiants = eventObject.participiants;
      globalEventList[eventObject.name].day = eventObject.day;
      globalEventList[eventObject.name].time = eventObject.time;
      globalEventList[eventObject.name].cell = cell;

      localStorage.setItem('eventsStorage', JSON.stringify(globalEventList));
      if (document.getElementById('errorContent') != null) {
        document.getElementById('errorContent').remove();
      }
      return true;
    }
  } else {
    return false;
  }
}
