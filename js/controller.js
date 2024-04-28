import * as model from './model.js';
import * as config from './config.js';
import homeView from './Views/homeView.js';
import loginView from './Views/loginView.js';
import navView from './Views/navView.js';
import logFormView from './Views/logFormView.js';
import chartView from './Views/chartView.js';
import adminView from './Views/adminView.js';
import submissionView from './Views/submissionView.js';
import values from './Views/values.js';

const dateStart = '2024-04-25';
const dateEnd = '2024-05-24';
const userId = config.USERID;
const userName = config.USERNAME;

// For Login, Home & Nav View

const loginToHome = function () {
  loginView.successfulLogin(userId, userName);
};

const displayCategory = function (no, activated) {
  homeView.activateBox(no, activated);
};

const displayNav = function () {
  navView.displayNavigation();
};

const hideNav = function () {
  navView.hideNavigation();
};

const displayChart = async function () {
  chartView.displayChartPage();
  navView.hideNavigation();
  values.initializeChart(model.chartXAxes, model.chartYAxes);
};

const hideChart = function () {
  chartView.hideChartPage();
};

const initDisplays = function () {
  loginView.handlerLogin(loginToHome);

  homeView.handlerActivateBox((no, activated) =>
    displayCategory(no, activated)
  );
  navView.handlerDisplayNavigation(displayNav);
  navView.handlerCloseNavigation(hideNav);
  chartView.handlerDisplayPg(displayChart);
  chartView.handlerHidePg(hideChart);
};

// initDisplays();
// For data
const updateMainVals = async function (inc, total) {
  await values.updateValues(inc, total);
};

const updateCategoryVals = async function (arr) {
  await values.updateCategories(arr);
};

const updateSubCategoryVals = async function (arr) {
  await values.updateSubCategories(arr);
};

const initRefreshPage = async function () {
  await updateMainVals(model.totalInc, model.totalExp['total']);
  await updateCategoryVals(Object.values(model.totalExp));
  await updateSubCategoryVals(model.listAmounts);
};

// For Forms

const displayLogExpForm = function () {
  logFormView.displayLogForm();
  navView.hideNavigation();
};

const closeLogForm = function () {
  logFormView.closeLogForm();
};

const displayAdmin = function () {
  adminView.displayAdminPg(dateStart, dateEnd);
  navView.hideNavigation();
};

const hideAdmin = function () {
  adminView.closeAdminPg();
};

const updateDependentFormExp = function (key) {
  const refArr = model.refSubs[key];
  logFormView.updateDropdownSub(refArr);
};

const clearForm = function () {
  submissionView.resetForm();
};

const initLogExpForm = function () {
  logFormView.handlerDisplayLogForm(displayLogExpForm);
  logFormView.handlerCloseLogForm(closeLogForm);

  adminView.handlerShowAdminPg(displayAdmin);
  adminView.handlerHideAdminPg(hideAdmin);
  logFormView.updateDropdownCategory(Object.values(model.listNames));
  logFormView.handlerUpdateDependentDropdown((key) =>
    updateDependentFormExp(key)
  );
  submissionView.handlerResetForm(clearForm);
};

// initLogExpForm();

// For chart
const generateChartDropdown = function (arr) {
  chartView.displayChartDropdown(arr);
};

const updateChartInterface = function (arrNames, arrVals) {
  values.updateChart(arrNames, arrVals);
};

const initChart = function () {
  chartView.handlerDisplayDropdown(() => generateChartDropdown(model.refNames));
  chartView.handlerUpdateChart(() =>
    updateChartInterface(model.chartXAxes, model.chartYAxes)
  );
};
// initChart();

// initRefreshPage();

let arrToExport;

// For data submission
const postDataExps = async function () {
  const expUrl = config.urls['urlExp'];
  arrToExport = submissionView.generateArrExp();
  await model.postToGoogleSheets(expUrl, arrToExport);
  await initRefreshPage();
};

const postDataInc = async function () {
  const postUrl = config.urls['urlInc'];
  arrToExport = submissionView.generateArrInc();
  await model.postToGoogleSheets(postUrl, arrToExport);
};

const submitLogDates = async function (userId) {
  const postUrl = config.urls['urlDates'];
  const checker = adminView.checkPassword(userId);
  // if (!checker) return;
  const arrToExport = submissionView.generateArrDates(checker);
  await model.postToGoogleSheets(postUrl, arrToExport);
};

const initDataSubmission = function () {
  submissionView.handlerSubmitExps(postDataExps);
  submissionView.handlerSubmitIncome(postDataInc);

  adminView.handlerSubmitDateForm(() => submitLogDates(userId));
};

// initDataSubmission();

// Fetch Data

const fetchRange = async function (url) {
  const rangeExp = await config.getRange(url);
  rangeExp.forEach((val, i) => {
    if (i >= 0 && i <= 7) {
      model.amountNeeds.push(val);
    } else if (i >= 8 && i <= 15) {
      model.amountWants.push(val);
    } else if (i >= 16 && i <= 19) {
      model.amountEmergency.push(val);
    } else if (i >= 20 && i <= 23) {
      model.amountSavings.push(val);
    }
  });

  model.fillListAmounts(
    model.amountNeeds,
    model.amountWants,
    model.amountEmergency,
    model.amountSavings
  );

  await model.getTotalInc(rangeExp[24]);
  await model.generateTotalExp();

  const amountOverall = await model.amountOverallCalc();
  model.chartYAxes.unshift(amountOverall);

  // console.log(model.listAmounts);
  // console.log(model.totalInc, model.totalExp);

  await chartView.updateDates(rangeExp[25], rangeExp[26]);

  initDisplays();
  initLogExpForm();
  await initRefreshPage();
  initChart();
  initDataSubmission();
};

const initFetchDataFromGoogleSheets = function () {
  fetchRange(config.fullUrl);
};
initFetchDataFromGoogleSheets();
