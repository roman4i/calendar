class defaultBlock {
  actionContainer() {
    if (document.getElementById('errorContent') !== null) {
      document.getElementById('errorContent').remove();
    }
    this.errorDiv = document.createElement('div');
    this.errorDiv.classList = 'errorCont';
    this.errorDiv.id = 'errorContent';
    return this.errorDiv;
  }
}

class ParticipantsError extends defaultBlock {
  constructor() {
    super();
    const errorObj = this.actionContainer();
    errorObj.insertAdjacentText('afterbegin', 'Failed to create an event. Please choose participants');
    return errorObj;
  }
}

class NameError extends defaultBlock {
  constructor() {
    super();
    const errorObj = this.actionContainer();
    errorObj.insertAdjacentText('afterbegin', 'Failed to create an event. Please enter event name');
    return errorObj;
  }
}

class BookedError extends defaultBlock {
  constructor() {
    super();
    const errorObj = this.actionContainer();
    errorObj.insertAdjacentText('afterbegin', 'Failed to create an event. Time slot is booked. Please choose other');
    return errorObj;
  }
}

export default class ErrorFactory {
  constructor(errorType) {
    if (errorType === 'participants') {
      return new ParticipantsError();
    }
    if (errorType === 'name') {
      return new NameError();
    }
    if (errorType === 'booked') {
      return new BookedError();
    }
  }
}
