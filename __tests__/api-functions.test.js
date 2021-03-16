import axios from 'axios';
import APICommunication from '../src/api-functions';

jest.mock('axios');

const errorsList = {
  server: 'Server error',
  network: 'Connection error',
};

describe('GET tests for API', () => {
  it('Should return event from GET request', async () => {
    const id = "d7d7fb9c-df9c-4221-bc4b-ffeaaa615315";
    const data = "{\"Lesson\":{\"participiants\":[\"Igor\",\"Yaroslav\"],\"day\":\"Friday\",\"time\":\"14:00\",\"cell\":36}}";
    const resp = [
      {
        "id": id,
        "data": data
      }
    ];
    axios.get.mockResolvedValue(resp);
    const apiReturn = new APICommunication();
    const request = await apiReturn.getEvents();
    expect(request).toEqual(resp);
  });
});
