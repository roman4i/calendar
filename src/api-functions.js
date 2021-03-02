import axios from 'axios';

export const getEvents = async () => {
  try {
    const events = await axios.get('http://158.101.166.74:8080/api/data/roman-verbenskyi/events');
    return events;
  } catch (error) {
    console.log(error.message);
  }
};

export const sendEvent = async (eventsStr) => {
  try {
    axios.post('http://158.101.166.74:8080/api/data/roman-verbenskyi/events', {
      data: eventsStr,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteEvent = async (eventID) => {
  try {
    await axios.delete(`http://158.101.166.74:8080/api/data/roman-verbenskyi/events/${eventID}`);
  } catch (error) {
    console.log(error.message);
  }
};
