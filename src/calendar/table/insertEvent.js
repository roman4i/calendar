import createDeleteWindow from './deleteWindow/delWindow';
import APICommunication from '../../api-functions';
import './deleteWindow/delWindowStyle.scss';
import StaticStorage from '../../static-data';

const dataStorage = StaticStorage.getInstance();
const operateAPI = APICommunication.getInstance();

export default async function innerEventCell(mode, personName) {
  const currentUser = dataStorage.getNames();
  const admins = dataStorage.getAdmins();

  const eventDataObj = {};

  const events = await operateAPI.getEvents();
  const eventDataArray = events.data.map((item) => JSON.parse(item.data));
  eventDataArray.forEach((element) => {
    Object.assign(eventDataObj, element);
  });

  if ((mode === 'all') && (eventDataObj !== null)) {
    Object.entries(eventDataObj).forEach(([key, event]) => {
      const targetCell = document.getElementById(`cell${event.cell}`);
      const cellDiv = document.createElement('div');
      cellDiv.id = `cellDiv${event.cell}`;
      cellDiv.insertAdjacentText('afterbegin', key);
      cellDiv.classList = 'eventCell';
      targetCell.append(cellDiv);

      if (admins.includes(currentUser)) {
        const delButton = document.createElement('div');
        delButton.classList = 'closeBtn';
        delButton.insertAdjacentText('afterbegin', '×');
        delButton.onclick = () => {
          createDeleteWindow(key);
        };
        cellDiv.append(delButton);
      }
    });
  }

  if (mode === 'single') {
    Object.entries(eventDataObj).forEach(([key, event]) => {
      const eventNames = event.participiants;
      eventNames.forEach((element) => {
        if (personName === element) {
          const targetCell = document.getElementById(`cell${event.cell}`);

          const cellDiv = document.createElement('div');
          cellDiv.id = `cellDiv${event.cell}`;
          cellDiv.insertAdjacentText('afterbegin', key);
          cellDiv.classList = 'eventCell';
          targetCell.append(cellDiv);

          if (admins.includes(currentUser)) {
            const delButton = document.createElement('div');
            delButton.classList = 'closeBtn';
            delButton.insertAdjacentText('afterbegin', '×');
            delButton.onclick = () => {
              createDeleteWindow(key);
            };
            cellDiv.append(delButton);
          }
        }
      });
    });
  }
}
