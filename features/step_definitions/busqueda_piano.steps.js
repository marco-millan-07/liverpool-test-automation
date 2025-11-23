const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const PaginaInicio = require('../../pages/PaginaInicio');
const PaginaResultados = require('../../pages/PaginaResultados');

Given('que estoy en la página de inicio', async function() 
  {
  this.paginaInicio = new PaginaInicio(this.page);
  await this.paginaInicio.irAInicio();
});

When('busco el producto {string}', async function (producto) 
{
  await this.paginaInicio.buscarProducto(producto);
  this.paginaResultados = new PaginaResultados(this.page);
});

Then('deben mostrarse al menos 15 productos', async function ()  
{
  const titulos = await this.paginaResultados.obtenerTitulos();
  expect(titulos.length).toBeGreaterThanOrEqual(15);
});

Then('al menos 15 títulos deben contener la palabra {string}', async function (palabra) 
{
  const titulos = await this.paginaResultados.obtenerTitulos();
  const coincidencias = titulos.filter(t => t.toLowerCase().includes(palabra.toLowerCase()));
  expect(coincidencias.length).toBeGreaterThanOrEqual(15);
});

Then('todos los títulos deben tener texto visible', async function () {
  const titulos = await this.paginaResultados.obtenerTitulos();
  titulos.forEach(t => expect(t.length).toBeGreaterThan(0));
});

Then('todos los precios deben tener un valor visible', async function ()
{
  const precios = await this.paginaResultados.obtenerPrecios();
  precios.forEach(p => expect(p.length).toBeGreaterThan(0));
});
