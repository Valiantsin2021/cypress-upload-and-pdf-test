import { defineConfig } from "cypress";
import { data } from './cypress/fixtures/readPDF.js'
import {rmdir} from 'fs'
export default defineConfig({
e2e: {
    setupNodeEvents(on, config) {
      on('task', {
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


