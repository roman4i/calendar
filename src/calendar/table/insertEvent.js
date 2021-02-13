import createDeleteWindow from './deleteWindow/delWindow';
import './deleteWindow/delWindowStyle.scss';

export default function innerEventCell(mode, personName) {
  const eventDataObj = JSON.parse(localStorage.getItem('eventsStorage'));

  if ((mode === 'all') && (eventDataObj !== null)) {
    Object.entries(eventDataObj).forEach(([key, event]) => {
      const targetCell = document.getElementById(`cell${event.cell}`);
      const cellDiv = document.createElement('div');
      cellDiv.id = `cellDiv${event.cell}`;
      cellDiv.insertAdjacentText('afterbegin', key);
      cellDiv.classList = 'eventCell';
      targetCell.append(cellDiv);
      const delButton = document.createElement('div');
      delButton.style.cursor = 'pointer';
      delButton.insertAdjacentText('afterbegin', '×');
      delButton.onclick = () => {
        createDeleteWindow(key);
      };
      cellDiv.append(delButton);
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

          const delButton = document.createElement('div');
          delButton.insertAdjacentText('afterbegin', '×');
          delButton.onclick = () => {
            createDeleteWindow(key);
          };
          cellDiv.append(delButton);
        }
      });
    });
  }
}
