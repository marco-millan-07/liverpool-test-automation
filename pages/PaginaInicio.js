class PaginaInicio {
  constructor(page) {
    this.page = page;
    this.campoBusqueda = 'input[aria-label="Buscar por producto, categoría y más..."]';
  }

  async irAInicio() {
    await this.page.goto('https://www.liverpool.com.mx/tienda/home');

    await this.page.waitForSelector(this.campoBusqueda, { timeout: 30000 });
  }

  async buscarProducto(termino) {
 
    await this.page.waitForSelector(this.campoBusqueda, { timeout: 30000 });
    await this.page.fill(this.campoBusqueda, termino);

    
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'load', timeout: 30000 }),
      this.page.keyboard.press('Enter')
    ]);

  }
}

module.exports = PaginaInicio;
