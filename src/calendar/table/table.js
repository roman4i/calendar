export default function createTable() {
  const headNames = ['Name', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const tableDiv = document.createElement('div');
  tableDiv.id = 'tableCont';
  tableDiv.classList = 'tableContainer';

  const calendarTable = document.createElement('table');

  const headTr = document.createElement('tr');
  headNames.forEach((item, number) => {
    const cell = document.createElement('td');
    cell.id = `cell${number}`;
    cell.classList = 'headColorise tabCell';
    cell.innerText = item;
    headTr.append(cell);
  });
  calendarTable.append(headTr);

  let idCount = 7;

  for (let i = 1; i < 10; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < 6; j++) {
      const cell = document.createElement('td');
      cell.id = `cell${idCount}`;
      cell.classList = 'tabCell';
      idCount++;

      tr.append(cell);
    }
    calendarTable.append(tr);
  }

  tableDiv.append(calendarTable);
  document.getElementById('root').append(tableDiv);

  let startTime = 10;
  for (let i = 7; i < 56; i += 6) {
    document.getElementById(`cell${i}`).innerText = `${startTime}:00`;
    startTime += 1;
  }
}
