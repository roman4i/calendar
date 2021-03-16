import axios from 'axios';

let instance = null;

function errorProcess(someError) {
  let returnVal;
  if (someError.response) {
    returnVal = 'Server error';
  } else if (someError.request) {
    returnVal = 'Connection error';
  } else {
    returnVal = someError.message;
  }
  return returnVal;
}

export default class APICommunication {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  async getEvents() {
    try {
      this._events = await axios.get('http://158.101.166.74:8080/api/data/roman-verbenskyi/events');
      return this._events;
    } catch (error) {
      return errorProcess(error);
    }
  }

  async sendEvent(eventsStr) {
    try {
      this._sendResult = await axios.post('http://158.101.166.74:8080/api/data/roman-verbenskyi/events', {
        data: eventsStr,
      });
      return this._sendResult;
    } catch (error) {
      return errorProcess(error);
    }
  }

  async deleteEvent(eventID) {
    try {
      this._deleteResult = await axios.delete(`http://158.101.166.74:8080/api/data/roman-verbenskyi/events/${eventID}`);
      return this._deleteResult;
    } catch (error) {
      return errorProcess(error);
    }
  }
}
