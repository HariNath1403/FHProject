import Forms from './forms.js';

class ChartView extends Forms {
  _linkChart = document.getElementById('link--chart');
  _chartDropdown = document.getElementById('chart__dropdown--input');

  convertToDate(serial) {
    // Serial dates count from January 0, 1900
    const excelStartDate = new Date(1900, 0, -1);

    // Add the number of days to January 0, 1900
    const resultDate = new Date(
      excelStartDate.setDate(excelStartDate.getDate() + serial)
    );

    // Format the date as dd/mm/yyyy
    const day = ('0' + resultDate.getDate()).slice(-2);
    const month = ('0' + (resultDate.getMonth() + 1)).slice(-2);
    const year = resultDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  async updateDates(start, end) {
    const startDate = document.getElementById('date--start');
    const endDate = document.getElementById('date--end');

    [startDate, endDate].forEach((el) => (el.innerHTML = ''));

    startDate.innerHTML = this.convertToDate(start);
    endDate.innerHTML = this.convertToDate(end);
  }

  displayChartPage() {
    [this._chart, this._dashboard].forEach(
      (pg) => (pg.style.transform = 'translateX(100%)')
    );
    // this._chart.style.transform = 'translateX(100%)';
  }

  hideChartPage() {
    [this._chart, this._dashboard].forEach(
      (pg) => (pg.style.transform = 'translateX(0)')
    );
    // this._chart.style.transform = 'translateX(0)';
  }

  displayChartDropdown(arr) {
    let markup = '<option value="Overall">Overall Expenses</option>';
    for (let i = 0; i < arr.length; i++) {
      const valName = arr[i].split(' ')[0];

      const strSnippet = `<option value="${valName}">${arr[i]}</option>`;

      markup += strSnippet;
    }

    this._chartDropdown.innerHTML = '';
    this._chartDropdown.insertAdjacentHTML('beforeend', markup);
  }

  handlerDisplayPg(handler) {
    this._linkChart.addEventListener('click', handler);
  }

  handlerHidePg(handler) {
    this._btnChartExit.addEventListener('click', handler);
  }

  handlerDisplayDropdown(handler) {
    this._chartDropdown.addEventListener('focus', handler);
  }

  handlerUpdateChart(handler) {
    this._chartDropdown.addEventListener('change', handler);
  }
}
export default new ChartView();
