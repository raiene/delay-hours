const heApi = require('api/index.js');

function getHE() {
    let he = heApi;
    console.log(he);
    return he;
  }
getHE();
// document.getElementById('he').insertAdjacentText(getHE());