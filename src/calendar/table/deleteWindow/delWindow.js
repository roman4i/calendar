export default function createDeleteWindow(elementName) {
  const dataObj = JSON.parse(localStorage.getItem('eventsStorage'));

  const createWindowCont = document.createElement('div');
  createWindowCont.id = 'delDiv';
  createWindowCont.classList = 'mainDelCont';

  const box = document.createElement('div');
  box.classList = 'modal-content';
  createWindowCont.append(box);

  const textDiv = document.createElement('div');
  textDiv.insertAdjacentText('afterbegin', `Are you sure ypu wand to delete \n"${elementName}"?`);
  textDiv.classList = 'delContStyle';
  box.append(textDiv);

  const btnDiv = document.createElement('div');
  btnDiv.classList = 'buttonsCont';
  box.append(btnDiv);

  const noBtn = document.createElement('input');
  noBtn.type = 'button';
  noBtn.value = 'No';
  noBtn.onclick = () => {
    createWindowCont.remove();
  };
  btnDiv.append(noBtn);

  const yesBtn = document.createElement('input');
  yesBtn.type = 'button';
  yesBtn.value = 'Yes';
  yesBtn.onclick = () => {
    document.getElementById(`cellDiv${dataObj[elementName].cell}`).remove();
    createWindowCont.remove();
    delete dataObj[elementName];
    localStorage.setItem('eventsStorage', JSON.stringify(dataObj));
  };
  btnDiv.append(yesBtn);

  document.getElementById('root').append(createWindowCont);
}
