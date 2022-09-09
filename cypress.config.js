import { defineConfig } from "cypress";
import { data } from './cypress/fixtures/readPDF.js'
export default defineConfig({
e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        data
      })
    }
  }
})
