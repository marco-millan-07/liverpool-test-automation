const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'reports',           // Carpeta donde está report.json
  reportPath: 'reports/html',   // Carpeta donde se genera el HTML
  metadata: {
    browser: {
      name: 'chromium',
      version: 'latest'
    },
    device: 'Máquina local',
    platform: {
      name: 'Windows',
      version: '10'
    }
  },
  customData: {
    title: 'Información del Proyecto',
    data: [
      { label: 'Proyecto', value: 'Automatización Liverpool' },
      { label: 'QA', value: 'Marco Gómez Millán' },
      { label: 'Framework', value: 'Playwright + Cucumber.js 18' }
    ]
  }
});
