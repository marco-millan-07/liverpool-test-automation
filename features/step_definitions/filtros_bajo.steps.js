const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const PaginaInicio = require('../../pages/PaginaInicio');
const PaginaResultados = require('../../pages/PaginaResultados');
const PaginaFiltros = require('../../pages/PaginaFiltros');

Given('que estoy en la página de inicio de Liverpool', async function () {
  this.paginaInicio = new PaginaInicio(this.page);
  await this.paginaInicio.irAInicio();
});

Given('realizo una búsqueda de {string}', async function (producto) {
  await this.paginaInicio.buscarProducto(producto);
  this.paginaResultados = new PaginaResultados(this.page);
  this.paginaFiltros = new PaginaFiltros(this.page);
});

When('aplico el filtro de marca Fender', async function () {
  await this.paginaFiltros.filtrarPorMarcaFender();
  await this.page.waitForTimeout(2500);
});

When('aplico el filtro de precio entre 5000 y 10000 pesos', async function () {
  await this.paginaFiltros.filtrarPrecio5000a10000();
  await this.page.waitForTimeout(2500);
});

Then('todos los resultados deben pertenecer a la marca Fender', async function () {
  const marcas = await this.page.$$eval(
    'h3.a-card-brand',
    nodos => nodos.map(n => n.textContent.trim())
  );

  marcas.forEach(marca => {
    expect(marca.toLowerCase()).toContain('fender');
  });
});

Then('todos los precios deben estar dentro del rango 5000 a 10000 pesos', async function () {

  const precios = await this.page.$$eval('.m-plp__card', cards => {
    return cards.map(card => {
      const precioNode = card.querySelector('.a-card-discount');
      if (!precioNode) return null;

      const partes = Array.from(precioNode.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE)
        .map(n => n.textContent.trim())
        .filter(t => t.length > 0);

      const centavosNode = precioNode.querySelector('sup');
      const centavos = centavosNode ? centavosNode.textContent.trim() : "00";

      let entero = "0";
      if (partes.length >= 2) {
        entero = partes[1].replace(/,/g, "");
      } else {
        entero = partes[0].replace(/,/g, "");
      }

      return Number(`${entero}.${centavos}`);
    });
  });

  const valores = precios.filter(v => v !== null);

  valores.forEach(valor => {
    expect(valor).toBeGreaterThanOrEqual(5000);
    expect(valor).toBeLessThanOrEqual(10000);
  });

});
