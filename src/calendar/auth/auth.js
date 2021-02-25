import { createDOMElement } from '../../utils';
// Now all works without classes, will fix it later
class User {
  constructor(name) {
    this.name = name;
    this.rights = 'basic';
  }

  get rights() {
    return this.rights;
  }

  set rights(value) {
    this.name = value;
  }
}

// class Admin extends User {
// }

export default function authShow() {
  const names = JSON.parse(localStorage.getItem('nameList'));
  const admins = JSON.parse(localStorage.getItem('admList'));

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
      if (admins.includes(selectedName, 0)) {
        document.getElementById('createEvent').hidden = false;
      } else {
        document.getElementById('createEvent').hidden = true;
      }
      mainCont.remove();
    },
  });
  confirmBlock.append(confirmAuth);
}
