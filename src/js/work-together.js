import { postData } from './swagger-api';
import {
  footerEmailInput,
  footerCommentInput,
  footerInputErrorMsg,
  footerCommentErrorMsg,
  footerSendBtn,
  form,
  footerBackdrop,
  modalWindowHeader,
  modalWindowText,
  modalCloseBtn,
  modalCloseBtnImg,
} from './refs';

footerEmailInput.addEventListener('input', onFooterEmailInput);
footerCommentInput.addEventListener('input', onFooterCommentInput);
form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);
footerBackdrop.addEventListener('click', opBackdropClick);
modalCloseBtn.addEventListener('click', onModalCloseBtnClick);

const formNewState = JSON.parse(localStorage.getItem('savedUserInput'));

if (formNewState) {
  form.elements.email.value = formNewState.email;
  form.elements.comments.value = formNewState.comment;
}

function onFooterEmailInput() {
  if (
    footerEmailInput.validity.patternMismatch ||
    footerEmailInput.value.trim().length <= 0
  ) {
    footerEmailInput.style.borderBottomColor = '#E74A3B';
    footerInputErrorMsg.style.color = '#E74A3B';
    footerInputErrorMsg.textContent = 'Invalid email, try again';
  } else {
    footerEmailInput.style.borderBottomColor = '#3CBC81';
    footerInputErrorMsg.style.color = '#3CBC81';
    footerInputErrorMsg.textContent = 'Success!';
  }
}

function onFooterCommentInput() {
  if (footerCommentInput.value.trim().length <= 0) {
    footerCommentInput.style.borderBottomColor = '#E74A3B';
    footerCommentErrorMsg.style.color = '#E74A3B';
    footerCommentErrorMsg.textContent = 'Please, fill the field';
  } else {
    footerCommentInput.style.borderBottomColor = '#3CBC81';
    footerCommentErrorMsg.style.color = '#3CBC81';
    footerCommentErrorMsg.textContent = 'Success!';
  }
}

function onFormInput(evt) {
  const userEmail = evt.currentTarget.elements.email.value.trim();
  const userComments = evt.currentTarget.elements.comments.value.trim();

  const userInput = {
    email: userEmail,
    comment: userComments,
  };

  if (
    userInput.comment !== '' &&
    document.activeElement === footerCommentInput
  ) {
    footerSendBtn.disabled = false;
    footerSendBtn.style.backgroundColor = '';
  } else {
    if (
      document.activeElement === footerEmailInput &&
      footerEmailInput.validity.valid
    ) {
      footerSendBtn.disabled = false;
      footerSendBtn.style.backgroundColor = '';
    } else {
      footerSendBtn.disabled = true;
      footerSendBtn.style.backgroundColor = '#3B3B3B';
    }
  }
  localStorage.setItem('savedUserInput', JSON.stringify(userInput));
}

async function onFormSubmit(evt) {
  evt.preventDefault();
  const userInfo = JSON.parse(localStorage.getItem('savedUserInput'));

  try {
    const response = await postData(userInfo);
    openBackdrop();
    modalWindowHeader.textContent = response.title;
    modalWindowText.textContent = response.message;
    form.reset();

    footerEmailInput.style.borderBottomColor = '';
    footerInputErrorMsg.textContent = '';
    footerCommentInput.style.borderBottomColor = '';
    footerCommentErrorMsg.textContent = '';

    localStorage.removeItem('savedUserInput');
  } catch (error) {
    openBackdrop();
    modalWindowHeader.textContent = error.message;
    modalWindowText.textContent = 'Please, try again';
    modalWindowHeader.style.color = '#ed3b44';
    modalWindowText.style.color = '#ed3b44';
    modalCloseBtnImg.style.stroke = '#ed3b44';
  }
}

function openBackdrop() {
  window.addEventListener('keydown', onEscKeyPress);
  footerBackdrop.classList.add('backdrop-is-open');
}

function closeBackdrop() {
  window.removeEventListener('keydown', onEscKeyPress);
  footerBackdrop.classList.remove('backdrop-is-open');
}

function opBackdropClick(event) {
  if (event.currentTarget === event.target) {
    closeBackdrop();
  }
}

function onModalCloseBtnClick() {
  closeBackdrop();
}

function onEscKeyPress(evt) {
  if (evt.code === 'Escape') {
    closeBackdrop();
  }
}
