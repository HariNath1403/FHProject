import { refNames } from '../model.js';
import * as helper from './../helper.js';

class Values {
  _totalIncome = document.querySelector('.dashboard__balances--value--income');
  _totalExpenditure = document.querySelector('.dashboard__total--amount');
  _totalBalance = document.querySelector(
    '.dashboard__balances--value--balance'
  );
  _totalNeeds = document.getElementById('total-exp-needs');
  _totalWants = document.getElementById('total-exp-wants');
  _totalEmergency = document.getElementById('total-exp-emergency');
  _totalSavings = document.getElementById('total-exp-savings');

  formatCurrency(no) {
    return new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(no);
  }

  formatCssIds(str) {
    return str.toLowerCase().replace(/ /g, '-');
  }

  updateValues(inc, total) {
    [this._totalIncome, this._totalBalance, this._totalExpenditure].forEach(
      (el) => (el.innerHTML = '')
    );

    this._totalIncome.insertAdjacentHTML('beforeend', this.formatCurrency(inc));

    this._totalBalance.insertAdjacentHTML(
      'beforeend',
      this.formatCurrency(inc - total)
    );
    this._totalExpenditure.insertAdjacentHTML(
      'beforeend',
      this.formatCurrency(total)
    );
  }

  updateCategories(arr) {
    const refEls = [
      this._totalNeeds,
      this._totalWants,
      this._totalEmergency,
      this._totalSavings,
    ];
    const refVals = arr;

    for (let i = 0; i < refEls.length; i++) {
      refEls[i].innerHTML = '';
      refEls[i].insertAdjacentHTML(
        'beforeend',
        this.formatCurrency(refVals[i])
      );
    }
  }

  updateSubCategories(arrCalc) {
    for (let i = 0; i < helper.subBoxes.length; i++) {
      helper.subBoxes[i].innerHTML = '';
      let markup = '';

      for (let j = 0; j < helper.arrNames[i].length; j++) {
        const calcVal = arrCalc[i][j];
        if (calcVal > 1) {
          const strSnippet = `
          <div class="dashboard__exp--row">
                  <h4 class="dashboard__exp--row--sub">${
                    helper.arrNames[i][j]
                  }</h4>
                  <h4
                    class="dashboard__exp--row--exp format-currency exp-${this.formatCssIds(
                      helper.arrNames[i][j]
                    )}"
                  >
                    ${this.formatCurrency(calcVal)}
                  </h4>
                </div>
          `;
          markup += strSnippet;
        }
      }

      helper.subBoxes[i].insertAdjacentHTML('beforeend', markup);
    }
  }

  initializeChart(arrNames, arrVals) {
    document.querySelector('.chart__diagram--title').innerHTML = '';
    document
      .querySelector('.chart__diagram--title')
      .insertAdjacentHTML('beforeend', 'Overall Expenses');

    let refArrNames = arrNames[0];
    let refArrVals = arrVals[0];

    let bars;
    let htmlSnippet;

    bars = 5;
    const refinedNames = [];
    const refinedVals = [];

    const arrFiltered = refArrVals.filter((no) => no > 0);

    if (arrFiltered.length > 5) {
      bars = 5;
      const arrCloned = [...refArrVals];
      const arrSorted = arrCloned.sort((a, b) => b - a);
      const cutOf = arrSorted[bars - 1];

      refArrVals.forEach((val, index) => {
        if (val >= cutOf) {
          refinedVals.push(val);
          refinedNames.push(refArrNames[index]);
        }
      });
    } else {
      bars = arrFiltered.length;
      arrFiltered.forEach((val) => {
        refinedVals.push(val);
        refinedNames.push(refArrNames[refArrVals.indexOf(val)]);
      });
    }
    // console.log(refinedNames, refinedVals);
    htmlSnippet = this.updateMarkupChart(refinedNames, refinedVals, bars);

    document.querySelector('.chart__diagram--graph').innerHTML = '';
    document
      .querySelector('.chart__diagram--graph')
      .insertAdjacentHTML('beforeend', htmlSnippet);
  }

  updateChart(arrNames, arrVals) {
    const query = document.getElementById('chart__dropdown--input').value;
    const index = helper.chartOptions.findIndex((exp) => exp === query);

    document.querySelector('.chart__diagram--title').innerHTML = '';
    document
      .querySelector('.chart__diagram--title')
      .insertAdjacentHTML('beforeend', `${query} Expenses`);

    let refArrNames = arrNames[index];
    let refArrVals = arrVals[index];

    let bars;
    let htmlSnippet;

    const refinedNames = [];
    const refinedVals = [];

    const arrFiltered = refArrVals.filter((no) => no > 0);

    if (arrFiltered.length > 5) {
      bars = 5;
      const arrCloned = [...refArrVals];
      const arrSorted = arrCloned.sort((a, b) => b - a);
      const cutOf = arrSorted[bars - 1];

      refArrVals.forEach((val, index) => {
        if (val >= cutOf) {
          refinedVals.push(val);
          refinedNames.push(refArrNames[index]);
        }
      });
    } else {
      bars = arrFiltered.length;
      arrFiltered.forEach((val) => {
        refinedVals.push(val);
        refinedNames.push(refArrNames[refArrVals.indexOf(val)]);
      });
    }
    // console.log(refinedNames, refinedVals);
    htmlSnippet = this.updateMarkupChart(refinedNames, refinedVals, bars);

    document.querySelector('.chart__diagram--graph').innerHTML = '';
    document
      .querySelector('.chart__diagram--graph')
      .insertAdjacentHTML('beforeend', htmlSnippet);
  }

  updateMarkupChart(listNames, listVals, counter) {
    let markup = '';
    const maxAmount = listVals.reduce((max, val) => Math.max(max, val), 0);

    for (let i = 0; i < counter; i++) {
      const strSnippet = `<div class="chart__diagram--graph--bar" style="height: ${
        (90 * listVals[i]) / maxAmount
      }%">
        <span class="chart__diagram--graph--var">${
          listNames[i]
        } <span>(${this.formatCurrency(listVals[i])})</span></span>
      </div>`;

      markup += strSnippet;
    }

    return markup;
  }
}

export default new Values();
