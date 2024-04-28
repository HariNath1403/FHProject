import { refNames } from '../model.js';
import Forms from './forms.js';

class LogFormView extends Forms {
  _linkLogExpForm = document.getElementById('link--log--exp');

  displayLogForm() {
    [this._dashboard, this._logExpPg].forEach((el) => {
      el.style.transform = 'translateX(-100%)';
    });
  }

  closeLogForm() {
    [this._dashboard, this._logExpPg].forEach((el) => {
      el.style.transform = 'translateX(0)';
    });
  }

  setDropdown(el, arr) {
    el.innerHtml = '';
    let markup = `<option value="" disabled selected hidden>
    Please select a category
  </option>`;

    arr.sort();

    const added = arr
      .map((el) => {
        return `<option value="${el}">
    ${el}
  </option>`;
      })
      .join('');

    markup = markup + added;

    el.insertAdjacentHTML('afterbegin', markup);
  }

  updateDropdownCategory(arr) {
    this.setDropdown(this._inputCategory, arr);
  }
  updateDropdownSub(arr) {
    this._inputSub.innerHTML = '';
    this.setDropdown(this._inputSub, arr);
  }

  handlerDisplayLogForm(handler) {
    // this._btnShowLogForm.addEventListener('click', handler);

    [this._btnShowLogForm, this._linkLogExpForm].forEach((el) =>
      el.addEventListener('click', handler)
    );
  }

  handlerCloseLogForm(handler) {
    this._btnExit.addEventListener('click', handler);
  }

  handlerUpdateDependentDropdown(handler) {
    this._inputCategory.addEventListener('change', () => {
      const val = this._inputCategory.value;
      const key = refNames.findIndex((el) => el === val);
      handler(key);
    });
  }
}
export default new LogFormView();
