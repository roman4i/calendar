export const createDOMElement = (options) => {
  const {
    tagName = 'div',
    id,
    type,
    classList,
    innerText,
    children,
    value,
    text,
    onclick,
    onchange,
    selectOptions,
  } = options;

  const element = document.createElement(tagName);

  if (id) {
    element.id = id;
  }

  if (classList) {
    element.classList = classList;
  }

  if (innerText) {
    element.innerText = innerText;
  }

  if (children && children.length) {
    children.forEach((child) => {
      element.append(child);
    });
  }

  if (value) {
    element.value = value;
  }

  if (text) {
    element.text = text;
  }

  if (onclick) {
    element.onclick = onclick;
  }

  if (onchange) {
    element.onchange = onchange;
  }

  if (type) {
    element.type = type;
  }

  if (selectOptions && selectOptions.length && tagName === 'select') {
    selectOptions.forEach((selectOption) => {
      const optionElement = createDOMElement({
        tagName: 'option',
        value: selectOption.value,
        text: selectOption.text,
      });

      element.add(optionElement);
    });
  }

  return element;
};
