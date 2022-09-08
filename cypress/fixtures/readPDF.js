// import fs from "fs";
// import path from 'path';
// import pdf from "pdf-parse";

// function readPdf (pathToPdf) {
//   return new Promise((resolve) => {
//     const pdfPath = path.resolve(pathToPdf)
//     let dataBuffer = fs.readFileSync(pdfPath);
//     pdf(dataBuffer).then(function ({ text }) {
//       resolve(text)
//     });
//   })
// }

// import * as fs from 'fs'
// import pdf from 'pdf-parse';
// let dataBuffer = fs.readFileSync('cypress/fixtures/example.pdf');
// export let data = pdf(dataBuffer).then(function(data) {
//   return data.text})