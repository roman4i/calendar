import APICommunication from '../../../api-functions';

const communicate = APICommunication.getInstance();

export default async function createDeleteWindow(elementName) {
  const dataObj = {};

  const events = await communicate.getEvents();
  const eventDataArray = events.data.map((item) => JSON.parse(item.data));
  eventDataArray.forEach((element) => {
    Object.assign(dataObj, element);
  });

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
    let toRemove;
    events.data.forEach((element) => {
      if (Object.keys(JSON.parse(element.data))[0] === elementName) {
        toRemove = element.id;
      }
    });
    communicate.deleteEvent(toRemove);
  };
  btnDiv.append(yesBtn);

  document.getElementById('root').append(createWindowCont);
}
