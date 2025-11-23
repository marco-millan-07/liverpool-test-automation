class PaginaFiltros {
  constructor(page) {
    this.page = page;

    // campo para buscar la marca
    this.inputBuscarMarca = '#searchBrand';

    // marca Fender
    this.checkboxMarcaFender = '#brand-FENDER';

    // filtro $
    this.checkboxPrecio5000a10000 = "input[id='variants.prices.sortPrice-5000-10000']";
  }

  async filtrarPorMarcaFender() {
    await this.page.fill(this.inputBuscarMarca, 'Fender');
    await this.page.waitForSelector(this.checkboxMarcaFender);
    await this.page.click(this.checkboxMarcaFender);
  }

  async filtrarPrecio5000a10000() {
    await this.page.waitForSelector(this.checkboxPrecio5000a10000);
    await this.page.click(this.checkboxPrecio5000a10000);
  }
}

module.exports = PaginaFiltros;
