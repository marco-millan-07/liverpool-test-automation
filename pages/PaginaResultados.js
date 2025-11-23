class PaginaResultados {
  constructor(page) {
    this.page = page;

    // Selectores 
    this.titulosProductos = 'h3.card-title.a-card-description';
    this.preciosProductos = '.a-card-discount';
    this.marcasProductos = 'h3.a-card-brand';
    this.primerProducto = '.m-plp__card';
  }

  async abrirPrimerProducto() {
    await this.page.waitForSelector(this.primerProducto, { timeout: 30000 });
    await Promise.all([
      this.page.click(this.primerProducto),
      this.page.waitForLoadState('domcontentloaded')
    ]);
  }

  async obtenerTitulos() {
    await this.page.waitForSelector(this.titulosProductos, { timeout: 30000 });
    return await this.page.$$eval(
      this.titulosProductos,
      nodos => nodos.map(n => n.textContent.trim())
    );
  }

  async obtenerPrecios() {
    await this.page.waitForSelector(this.preciosProductos, { timeout: 30000 });
    return await this.page.$$eval(
      this.preciosProductos,
      nodos => nodos.map(n => n.textContent.trim())
    );
  }

  async obtenerMarcas() {
    await this.page.waitForSelector(this.marcasProductos, { timeout: 30000 });
    return await this.page.$$eval(
      this.marcasProductos,
      nodos => nodos.map(n => n.textContent.trim())
    );
  }


  async obtenerTitulosPagina() {
    await this.page.waitForSelector(this.titulosProductos, { timeout: 30000 });

    const titulos = await this.page.$$eval(
      this.titulosProductos,
      nodos => nodos.map(n => n.textContent.trim())
    );

    return titulos;
  }

  async irAPagina(numero) {
    const selectorPagina = `a.page-link:text("${numero}")`;

    await this.page.waitForSelector(selectorPagina, { timeout: 20000 });

    await Promise.all([
      this.page.click(selectorPagina),
      this.page.waitForLoadState('domcontentloaded')
    ]);
  }

  async obtenerPaginaActual() {
    const selectorActual = 'li.page-item.active a.page-link';

    await this.page.waitForSelector(selectorActual, { timeout: 20000 });

    const texto = await this.page.textContent(selectorActual);
    return texto.trim();
  }

    async obtenerTotalResultadosUI() {
    const selectorTotal = 'p.a-plp-results-title';

    await this.page.waitForSelector(selectorTotal, { timeout: 30000 });
    const texto = await this.page.textContent(selectorTotal);
    const match = texto.match(/(\d+)/);
    if (!match) return null;

    return Number(match[1]);
  }

}

module.exports = PaginaResultados;
