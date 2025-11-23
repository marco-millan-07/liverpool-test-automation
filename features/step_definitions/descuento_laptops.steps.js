const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PaginaDescuentos = require('../../pages/PaginaDescuentos');

Given('que navego a la categoría de Laptops', async function () {
  await this.paginaInicio.irAInicio();
  await this.paginaInicio.buscarProducto("laptop");
});

When('aplico el filtro de "50% o más de descuento"', async function () {
  await this.paginaDescuentos.aplicarFiltro50();
});

Then('todos los productos deben tener un descuento real del 50% o mayor', async function () {
  const antesLista = await this.paginaDescuentos.obtenerPreciosAntes();
  const ahoraLista = await this.paginaDescuentos.obtenerPreciosAhora();

  expect(antesLista.length).toBeGreaterThan(0);
  expect(ahoraLista.length).toBeGreaterThan(0);

  // Convertir precios: "$4,999" → 4999
  const limpiarPrecio = (txt) => Number(txt.replace(/[^0-9.]/g, ""));

  const preciosAntes = antesLista.map(limpiarPrecio);
  const preciosAhora = ahoraLista.map(limpiarPrecio);

  expect(preciosAntes.length).toBe(preciosAhora.length);

  console.log("\n--- VALIDACIÓN DE DESCUENTOS ---");

  for (let i = 0; i < preciosAntes.length; i++) {
    const antes = preciosAntes[i];
    const ahora = preciosAhora[i];

    expect(antes).toBeGreaterThan(ahora);

    const descuentoReal = ((antes - ahora) / antes) * 100;

    console.log("Descuento REAL:", descuentoReal.toFixed(2), "%");

    expect(descuentoReal).toBeGreaterThanOrEqual(50);
  }
});
