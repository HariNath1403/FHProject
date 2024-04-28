const expOverall = ['Needs', 'Wants', 'Emergency', 'Savings'];

const expNeeds = [
  'Housing',
  'Utilities',
  'Groceries',
  'Food',
  'Transportation',
  'Healthcare',
  'Childcare',
  'Education',
];

const expWants = [
  'Dining Out',
  'Entertainment',
  'Hobbies',
  'Travel',
  'Fashion',
  'Gadgets',
  'Furniture',
  'Donations',
];

const expEmergency = [
  'Emergency Repairs',
  'Medical Emergencies',
  'Family Care',
  'Others',
];

const expSavings = [
  'Emergency Fund',
  'Saving Goals',
  'Retirement Savings',
  'Investment Accounts',
];

const expEmergencySimple = ['Repairs', 'Medical', 'Family', 'Others'];

const expSavingsSimple = [
  'Emergency F.',
  'Saving G.',
  'Retirement',
  'Investment',
];

export const listExp = {
  needs: expNeeds,
  wants: expWants,
  emergency: expEmergency,
  savings: expSavings,
};

export const listNames = {
  needs: 'Needs Expenses',
  wants: 'Wants Expenses',
  emergency: 'Emergency Expenses',
  savings: 'Savings & Investment',
};

export const refNames = Object.values(listNames);
export const refSubs = Object.values(listExp);
const refCategories = Object.keys(listNames);

/*
// Fetch from Google Sheets
const amountNeeds = [600, 220.65, 400, 70, 500, 0, 0, 54.7];
const amountWants = [350.21, 0, 64.7, 0, 94.7, 571.5, 0, 0];
const amountEmergency = [0, 0, 0, 10];
const amountSavings = [900, 200, 0, 0];

export const listAmounts = [
  amountNeeds,
  amountWants,
  amountEmergency,
  amountSavings,
];
*/
export const amountNeeds = [];
export const amountWants = [];
export const amountEmergency = [];
export const amountSavings = [];

export const chartXAxes = [
  expOverall,
  expNeeds,
  expWants,
  expEmergencySimple,
  expSavingsSimple,
];

export const chartYAxes = [];

export let listAmounts = [];

export const fillListAmounts = function (arr1, arr2, arr3, arr4) {
  listAmounts.push(arr1);
  listAmounts.push(arr2);
  listAmounts.push(arr3);
  listAmounts.push(arr4);

  chartYAxes.push(arr1);
  chartYAxes.push(arr2);
  chartYAxes.push(arr3);
  chartYAxes.push(arr4);
};

export const amountOverallCalc = async function () {
  const expenses = [];
  await listAmounts.forEach((group) => {
    const amount = group.reduce((acc, val) => acc + val, 0);
    expenses.push(amount);
  });
  return expenses;
};

// const amountOverall = amountOverallCalc();

export let totalExp = {};
export let totalInc;
// totalInc = 4500;

export const getTotalInc = async function (amount) {
  totalInc = amount;
};

export const generateTotalExp = async function () {
  for (let i = 0; i < refCategories.length; i++) {
    const refName = refCategories[i];
    const refTotal = await listAmounts[i].reduce((acc, val) => acc + val, 0);

    totalExp[refName] = Math.round(refTotal * 100) / 100;
  }

  const grandTotal = await Object.values(totalExp).reduce(
    (acc, val) => acc + val,
    0
  );

  totalExp['total'] = await grandTotal;
};

export const postToGoogleSheets = async function (postUrl, arrExport) {
  try {
    const formData = new FormData();
    arrExport.forEach((val, index) => {
      formData.append(index, val);
    });

    const response = await fetch(postUrl, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const jsonResp = await response.json();
      console.log('Response from Google Sheets:', jsonResp);
    } else {
      throw new Error('Failed to post data to Google Sheets');
    }
  } catch (err) {
    console.error('Error: ', err);
  }
};
