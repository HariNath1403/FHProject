// document.getElementById('login').style.display = 'none';

export let USERID = 'Hari-23';
export let USERNAME = 'Hari_14';

const SHEET_ID = '1iHnA69n_2rcCvuPtpWvVmlLOlmtpJvvFbpE1HE72b_E';
const SHEET_TITLE = 'Admin';
const SHEET_RANGE = 'B2:B28';

export const fullUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE}`;

export const getRange = async function (url) {
  try {
    const response = await fetch(url);
    const data = await response.text();
    const values = JSON.parse(data.substr(47).slice(0, -2))['table']['rows'];

    const myRange = [];
    for (let i = 0; i < values.length; i++) {
      const val = values[i]['c'][0]['v'];
      myRange.push(val);
    }

    return myRange;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const urls = {
  urlExp:
    'https://script.google.com/macros/s/AKfycbwnJILa3Gl6GvMllXSIFK42B_hGD6SP7oJhtMbO9K5AttUyYAKhccMFmEwxzBu0N2mv/exec',
  urlInc:
    'https://script.google.com/macros/s/AKfycbwKBcsHIxlo8WMtTuA5CRl44nxxBM69l1Y8y_93435uL8LaZPugjL476LlXjIu3uSiD/exec',

  urlDates:
    'https://script.google.com/macros/s/AKfycbzVTijLZLAuqLok5AoJ1M0ZXP2bUioYJRx8NUKbQrsIGLwi17ycZtM4cdkxQtjMoTVYOQ/exec',
};
