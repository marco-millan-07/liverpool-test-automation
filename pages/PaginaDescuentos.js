class PaginaDescuentos {
  constructor(page) {
    this.page = page;

    // Filtro del 50%
    this.filtro50 = 'div.m-radioButton:has-text("50.0 % o más") input[type="radio"]';
    this.precioAntes = '.a-card-price';
    this.precioAhora = '.a-card-discount';
  }

  async aplicarFiltro50() {
    await this.page.waitForSelector(this.filtro50, { timeout: 30000 });
    await this.page.click(this.filtro50);
    await this.page.waitForLoadState("load");
  }

  async obtenerPreciosAntes() {
    return await this.page.$$eval(this.precioAntes, nodos =>
      nodos.map(n => n.textContent.trim()).filter(t => t.length > 0)
    );
  }

  async obtenerPreciosAhora() {
    return await this.page.$$eval(this.precioAhora, nodos =>
      nodos.map(n => n.textContent.trim()).filter(t => t.length > 0)
    );
  }
}

module.exports = PaginaDescuentos;

