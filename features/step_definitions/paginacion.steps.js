const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const PaginaResultados = require('../../pages/PaginaResultados');

When('capturo los títulos de la página 1', async function () {
  this.titulosPagina1 = await this.paginaResultados.obtenerTitulosPagina();
});

When('navego a la página 2', async function () {
  await this.paginaResultados.irAPagina(2);
  this.titulosPagina2 = await this.paginaResultados.obtenerTitulosPagina();
});

Then('los productos deben ser diferentes a los de la página 1', async function () {
  expect(this.titulosPagina2).not.toEqual(this.titulosPagina1);
});

Then('la página actual debe ser la número {int}', async function (num) {
  const actual = await this.paginaResultados.obtenerPaginaActual();
  expect(Number(actual)).toBe(num);
});
