import ErrorFactory from '../src/eventCreate/eventCreateEror';
import APICommunication from '../src/api-functions';
import processData from '../src/eventCreate/generateEventData';

const mockGetInstance = jest.fn();
jest.mock('../src/api-functions', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getEvents: jest.fn().mockResolvedValue({data: [
        {
          "id": "d7d7fb9c-df9c-4221-bc4b-ffeaaa615315",
          "data": "{\"Lesson\":{\"participiants\":[\"Igor\",\"Yaroslav\"],\"day\":\"Friday\",\"time\":\"14:00\",\"cell\":36}}"
        }
      ]}),
      sendEvent: jest.fn()
    };
  });
});

const rootDiv = document.createElement('div');
rootDiv.id = 'root';
document.body.append(rootDiv);

function newOption(inVal, inText) {
  const someOption = document.createElement('option');
  someOption.value = inVal;
  someOption.text = inText;
  return someOption;
}

function checkError() {
  const errorContainer = document.getElementById('errorContent');
  let returnVal;
  if (errorContainer != null) {
    returnVal = errorContainer.textContent;
  } else {
    returnVal = 'is null';
  }
  return returnVal;
}

async function reuseFunction() {
  if (document.getElementById('errorContent') != null) {
    document.getElementById('errorContent').remove();
  }
  const res = await processData();
  return res;
}

const errorsList = {
  name: 'Failed to create an event. Please enter event name',
  participants: 'Failed to create an event. Please choose participants',
  booking: 'Failed to create an event. Time slot is booked. Please choose other',
};

const eventName = document.createElement('input');
eventName.type = 'text';
eventName.id = 'nameField';
eventName.value = '';
rootDiv.append(eventName);

const selectPersons = document.createElement('select');
selectPersons.id = 'choosePerson';
selectPersons.add(newOption(0, 'Select names'));
selectPersons.selectedIndex = '0';
rootDiv.append(selectPersons);

const selectDay = document.createElement('select');
selectDay.id = 'daySelect';
selectDay.add(newOption(0, 'Thursday'));
selectDay.selectedIndex = '0';
rootDiv.append(selectDay);

const selectTime = document.createElement('select');
selectTime.id = 'timeSelect';
selectTime.add(newOption(0, '12:00'));
selectTime.selectedIndex = '0';
rootDiv.append(selectTime);

describe('Data generation ', () => {

  it('Testing error by name', async () => {
    eventName.value = '';
    const boolResult = await reuseFunction();
    expect(boolResult).toBe(false);
    expect(checkError()).toEqual(errorsList.name);
  });

  it('Testing for not choosed names list', async () => {
    eventName.value = 'The great event';
    const boolResult = await reuseFunction();
    expect(boolResult).toBe(false);
    expect(checkError()).toEqual(errorsList.participants);
  });

  it('Testing for booking error', async () => {
    selectPersons.options[0].text = 'Oleg, Igor';
    selectTime.options[0].text = '14:00';
    selectDay.options[0].text = 'Friday';
    const boolResult = await reuseFunction();
    expect(boolResult).toBe(false);
    expect(checkError()).toEqual(errorsList.booking);
  });

  it('Right result (returns true)', async () => {
    eventName.value = 'Right event';
    selectPersons.options[0].text = 'Oleg,Olga,Anna';
    selectTime.options[0].text = '12:00';
    selectDay.options[0].text = 'Thursday';
    const boolResult = await reuseFunction();
    expect(boolResult).toBe(true);
  });
});
