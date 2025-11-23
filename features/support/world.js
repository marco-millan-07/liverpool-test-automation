
const { setWorldConstructor, World } = require('@cucumber/cucumber');
const playwright = require('playwright');

const PaginaInicio = require('../../pages/PaginaInicio');
const PaginaResultados = require('../../pages/PaginaResultados');
const PaginaFiltros = require('../../pages/PaginaFiltros');
const PaginaDescuentos = require('../../pages/PaginaDescuentos');


let globalBrowser = null;

async function iniciarNavegadorGlobal() {
  globalBrowser = await playwright.chromium.launch({
    headless: false, 
    slowMo: 100
  });
  return globalBrowser;
}


async function cerrarNavegadorGlobal() {
  if (globalBrowser) {
    await globalBrowser.close();
  }
}

class CustomWorld extends World {
  constructor(options) {
    super(options);

    this.browser = globalBrowser;
    this.context = null;
    this.page = null;

    this.attach = options.attach; 
  }

  async nuevoContexto() {
    if (!this.browser) {
      throw new Error("El navegador no se ha iniciado. Asegúrate de llamar a iniciarNavegadorGlobal en BeforeAll.");
    }

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();


    this.paginaInicio = new PaginaInicio(this.page);
    this.paginaResultados = new PaginaResultados(this.page);
    this.paginaFiltros = new PaginaFiltros(this.page);
    this.paginaDescuentos = new PaginaDescuentos(this.page);
  }

  async cerrarContexto() {
    if (this.context) {
      await this.context.close();
    }
  }
}

setWorldConstructor(CustomWorld);

module.exports = {
  iniciarNavegadorGlobal,
  cerrarNavegadorGlobal,
};
