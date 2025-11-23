module.exports = {
  default: {
    require: [
      'features/support/world.js',
      'features/support/hooks.js',
      'features/step_definitions/*.steps.js'
    ],


    parallel: 1,

    format: [
      'progress',                     // Consola
      'json:reports/report.json'      // Archivo JSON para el HTML
    ]
  }
};
