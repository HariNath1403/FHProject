import Forms from './forms.js';

class SubmissionView extends Forms {
  // resetForm() {
  //   this._form.reset();
  // }

  generateArrExp() {
    const refDate = document.getElementById('form-expenses-date');
    const refDetails = document.getElementById('form-expenses-details');
    const expCategory = document.getElementById('form-expenses-category');
    const expSubCategory = document.getElementById('form-expenses-sub');
    const refAmount = document.getElementById('form-expenses-amount');

    const arrToExport = [
      refDate.value,
      refDetails.value,
      expCategory.value,
      expSubCategory.value,
      refAmount.value,
    ];

    this.resetForm();

    return arrToExport;
  }

  generateArrInc() {
    const refDate = document.getElementById('inc-date');
    const refDetails = document.getElementById('inc-details');
    const incAmount = document.getElementById('inc-amount');

    const arrToExport = [refDate.value, refDetails.value, incAmount.value];

    console.log(arrToExport);

    this.resetLogForm();

    return arrToExport;
  }
  generateArrDates(checker) {
    if (!checker) return;
    const dateStart = document.querySelector('.admin__form--input--start');
    const dateEnd = document.querySelector('.admin__form--input--end');

    const arrToExport = [dateStart.value, dateEnd.value];

    console.log(arrToExport);

    this._admin.style.opacity = 0;
    this._admin.style.transform = 'translateY(0)';

    return arrToExport;
  }

  handlerSubmitExps(handler) {
    this._form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      handler();
    });
  }

  handlerSubmitIncome(handler) {
    this._btnAdminLog.addEventListener('click', (ev) => {
      ev.preventDefault();
      handler();
    });
  }

  handlerResetForm(handler) {
    this._btnClear.addEventListener('click', (ev) => {
      ev.preventDefault();
      handler();
    });
  }
}

export default new SubmissionView();
