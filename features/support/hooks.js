const { setDefaultTimeout, BeforeAll, Before, After, AfterAll, Status } = require('@cucumber/cucumber');
const { iniciarNavegadorGlobal, cerrarNavegadorGlobal } = require('./world');
const fs = require('fs');
const path = require('path');

setDefaultTimeout(60 * 1000);

function asegurarCarpetas() {
  const rutas = [
    "reports",
    "reports/screenshots",
    "reports/json"
  ];

  rutas.forEach((ruta) => {
    if (!fs.existsSync(ruta)) {
      fs.mkdirSync(ruta, { recursive: true });
    }
  });
}

BeforeAll(async function () {
  asegurarCarpetas();
  await iniciarNavegadorGlobal();
});

Before(async function () {
  await this.nuevoContexto();
});

After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    try {

   
      const nombre = `error_${Date.now()}.png`;
      const ruta = path.join("reports/screenshots", nombre);

       const buffer = await this.page.screenshot({
        path: ruta,
        type: 'png',
        fullPage: true
      });


      await this.attach(buffer.toString('base64'), 'image/png');

    } catch (error) {
      console.error("Error al tomar screenshot:", error);
    }
  }

  await this.cerrarContexto();
});

AfterAll(async function () {
  await cerrarNavegadorGlobal();
});
