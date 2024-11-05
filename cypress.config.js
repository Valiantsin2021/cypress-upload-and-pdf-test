import { defineConfig } from "cypress";
import { data } from './cypress/fixtures/readPDF.js'
import {rmdir} from 'fs'
import xlsx from "node-xlsx"
import fs from "fs"
import path from "path"
export default defineConfig({
e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        parseXlsx({ filePath }) {
          return new Promise((resolve, reject) => {
            try {
              const jsonData = xlsx.parse(fs.readFileSync(filePath));
              resolve(jsonData);
            } catch (e) {
              reject(e);
            }
          });
        },
        data,
        deleteFolder () { 
          console.log('deleting the file')
          return new Promise(resolve => {
            rmdir('cypress/downloads', { maxRetries: 10, recursive: true }, (err) => {
              if (err) {
                console.error(err)
              }
              resolve(null)
              })
            })
          }
      })     
    },
    baseUrl: 'https://www.ilovepdf.com/',
  }
})


