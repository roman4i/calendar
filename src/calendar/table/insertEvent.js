import createDeleteWindow from './deleteWindow/delWindow';
import './deleteWindow/delWindowStyle.scss';

export default function innerEventCell(mode, personName) {
  const eventDataObj = JSON.parse(localStorage.getItem('eventsStorage'));

  if ((mode === 'all') && (eventDataObj != null)) {
    for (const key in eventDataObj) {
      const targetCell = document.getElementById(`cell${eventDataObj[key].cell}`);

      const cellDiv = document.createElement('div');
      cellDiv.id = `cellDiv${eventDataObj[key].cell}`;
      cellDiv.insertAdjacentText('afterbegin', key);
      cellDiv.classList = 'eventCell';
      targetCell.append(cellDiv);

      const delButton = document.createElement('div');
      delButton.insertAdjacentText('afterbegin', '×');
      delButton.onclick = () => {
        createDeleteWindow(key);
      };
      cellDiv.append(delButton);
    }
  }

  if (mode === 'single') {
    for (const key in eventDataObj) {
      const eventNames = eventDataObj[key].participiants;
      eventNames.forEach((element) => {
        if (personName === element) {
          const targetCell = document.getElementById(`cell${eventDataObj[key].cell}`);

          const cellDiv = document.createElement('div');
          cellDiv.id = `cellDiv${eventDataObj[key].cell}`;
          cellDiv.insertAdjacentText('afterbegin', key);
          cellDiv.classList = 'eventCell';
          targetCell.append(cellDiv);

          const delButton = document.createElement('div');
          delButton.insertAdjacentText('afterbegin', '×');
          delButton.onclick = () => {
            createDeleteWindow(key);
          };
          cellDiv.append(delButton);
        }
      });
    }
  }
}
