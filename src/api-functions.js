import axios from 'axios';

export default class APICommunication {
  static getInstance() {
    if (!APICommunication.instance) {
      APICommunication.instance = new APICommunication();
    }
    return APICommunication.instance;
  }

  async getEvents() {
    try {
      this._events = await axios.get('http://158.101.166.74:8080/api/data/roman-verbenskyi/events');
      return this._events;
    } catch (error) {
      return error;
    }
  }

  async sendEvent(eventsStr) {
    try {
      this._sendResult = await axios.post('http://158.101.166.74:8080/api/data/roman-verbenskyi/events', {
        data: eventsStr,
      });
      return this._sendResult;
    } catch (error) {
      return error;
    }
  }

  async deleteEvent(eventID) {
    try {
      this._deleteResult = await axios.delete(`http://158.101.166.74:8080/api/data/roman-verbenskyi/events/${eventID}`);
      return this._deleteResult;
    } catch (error) {
      return error;
    }
  }
}
