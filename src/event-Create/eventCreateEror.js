export default function creationError(errorType) {
  if (document.getElementById('errorContent') != null) {
    document.getElementById('errorContent').remove();
  }

  const errorDiv = document.createElement('div');
  errorDiv.classList = 'errorCont';
  errorDiv.id = 'errorContent';

  if (errorType === 'participants') {
    errorDiv.insertAdjacentText('afterbegin', 'Failed to create an event. Please choose participants');
  }
  if (errorType === 'name') {
    errorDiv.insertAdjacentText('afterbegin', 'Failed to create an event. Please enter event name');
  }
  if (errorType === 'booked') {
    errorDiv.insertAdjacentText('afterbegin', 'Failed to create an event. Time slot is booked. Please choose other');
  }
  return errorDiv;
}
