export default class Forms {
  // From Dashboard
  _dashboard = document.getElementById('dashboard');
  _navigation = document.getElementById('navigation');
  _chart = document.getElementById('chart');
  _admin = document.getElementById('admin');
  _btnShowLogForm = document.querySelector('.dashboard__cta--btn');
  _btnHamburger = document.querySelector('.dashboard__nav');
  _btnNavExit = document.querySelector('.nav__exit--btn');

  // From Log Form Page
  _logExpPg = document.getElementById('form-log-exp');
  _form = document.querySelector('.expenses__form');
  _btnExit = document.querySelector('.expenses__exit--icon');
  _btnLog = document.querySelector('.expenses__form--cta--submit');
  _btnClear = document.querySelector('.expenses__form--cta--clear');
  _inputCategory = document.getElementById('form-expenses-category');
  _inputSub = document.getElementById('form-expenses-sub');

  // Chart Graph
  _chartGraph = document.querySelector('.chart__diagram--graph');
  _btnChartExit = document.querySelector('.chart__exit--btn');

  // For Admin Page
  _formAdminIncome = document.querySelector('.admin__income');
  _btnAdminLog = document.querySelector('.admin__form--btn--income');
  _btnAdminDates = document.querySelector('.admin__form--btn--dates');
  _btnAdminExit = document.querySelector('.admin__exit--btn');

  // Functions
  resetForm() {
    this._form.reset();
  }

  resetLogForm() {
    this._formAdminIncome.reset();
  }

  handlerResetForm(handler) {
    this._btnClear.addEventListener('click', handler);
  }
}
