import { createDOMElement } from '../../utils';
import innerEventCell from '../table/insertEvent';
import StaticStorage from '../../static-data';

const dataStorage = StaticStorage.getInstance();

class User {
  rights = 'basic';
  constructor(name) {
    this.name = name;
  }

  get rights() {
    return this.rights;
  }

  set rights(value) {
    this.name = value;
  }
}

class Admin extends User {
   rights = 'admin';
}

export default function authShow() {
  const names = dataStorage.getNames();
  const admins = dataStorage.getAdmins();
  const usersList = [];

  names.forEach((element) => {
    if (admins.includes(element)) {
      usersList.push(new Admin(element));
    } else {
      usersList.push(new User(element));
    }
  });

  const root = document.getElementById('root');
  const mainCont = createDOMElement({
    classList: 'mainDelCont',
  });
  root.append(mainCont);

  const modalAuthCont = createDOMElement({
    classList: 'modal-content',
  });
  mainCont.append(modalAuthCont);

  const authHeader = createDOMElement({
    classList: 'delContStyle',
    innerText: 'Please authorise',
  });
  modalAuthCont.append(authHeader);

  const confirmBlock = createDOMElement({
    classList: 'buttonsCont',
  });
  modalAuthCont.append(confirmBlock);

  const options = [];
  names.forEach((element, index) => {
    options.push({ value: index, text: element });
  });

  const authSelect = createDOMElement({
    tagName: 'select',
    selectOptions: options,
  });
  confirmBlock.append(authSelect);

  const confirmAuth = createDOMElement({
    tagName: 'input',
    type: 'button',
    value: 'Confirm',
    onclick: () => {
      const selectedName = authSelect.options[authSelect.selectedIndex].text;
      usersList.forEach((element) => {
        if (selectedName === element.name && element.rights === 'basic') {
          document.getElementById('createEvent').disabled = true;
        }
        localStorage.setItem('currentUser', selectedName);
      });
      mainCont.remove();
      innerEventCell('all');
    },
  });
  confirmBlock.append(confirmAuth);
};
