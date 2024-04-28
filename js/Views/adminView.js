import Forms from './forms.js';

class AdminView extends Forms {
  _adminLink = document.getElementById('link--admin');
  _adminFormIncome = document.querySelector('.admin__income');
  _adminFormDates = document.querySelector('.admin__dates');
  _startDateInput = document.querySelector('.admin__form--input--start');
  _endDateInput = document.querySelector('.admin__form--input--end');

  displayAdminPg(start, end) {
    this._admin.style.opacity = 1;
    this._admin.style.transform = 'translateY(-100%)';
    this._startDateInput.value = start;
    this._endDateInput.value = end;
  }

  closeAdminPg() {
    this._admin.style.opacity = 0;
    this._admin.style.transform = 'translateY(0)';
  }

  checkPassword(password) {
    const startDate = document.querySelector('.admin__form--input--start');
    const endDate = document.querySelector('.admin__form--input--end');
    const loginKey = document.querySelector('.admin__form--input--password');

    let checker = false;

    if (
      !startDate.value ||
      !endDate.value ||
      loginKey.value !== password ||
      endDate.value - startDate.value <= 0
    ) {
      alert('Date configuration form is incomplete or incorrect filled.');
    } else {
      checker = true;
    }

    return checker;
  }

  handlerShowAdminPg(handler) {
    this._adminLink.addEventListener('click', handler);
  }

  handlerHideAdminPg(handler) {
    this._btnAdminExit.addEventListener('click', handler);
  }

  handlerSubmitDateForm(handler) {
    this._btnAdminDates.addEventListener('click', (ev) => {
      ev.preventDefault();
      handler();
    });
  }
}

export default new AdminView();
