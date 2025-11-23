**Proyecto de Automatización de Pruebas – Liverpool.com.mx**
Autor: Marco Antonio Gómez Millán

Este proyecto implementa Playwright + Cucumber (BDD) bajo el patrón de diseño Page Object Model (POM), ejecutando 4 pruebas funcionales sobre el sitio web de Liverpool.  
Incluye reportes automaticos con Multiple Cucumber HTML Reporter.

**Herramientas usadas**
- Playwright
-Cucumber.js (BDD: Gherkin + Steps)
- JavaScript / Node.js
- Page Object Model (POM)
- Multiple Cucumber HTML Reporter

**2. Objetivo del proyecto**

Automatizar 4 casos de prueba funcionales** sobre el sitio www.liverpool.com.mx, empleando BDD y POM.

**3. Casos de prueba automatizados**

1. Búsqueda de pianos
- Buscar "piano"
- Validar que existan mínimo 15 resultados
- Verificar que los títulos incluyan la palabra "piano"
- Confirmar que títulos y precios no estén vacíos

 2. Filtros | Bajo electrónico
- Buscar "bajo electrónico"
- Aplicar filtro de marca (Fender)
- Aplicar filtro por rango de precio
- validar que todos los resultados sean Fender
- validar que los precios estén dentro del rango filtrado

3. Paginacion | guitarra
- Buscar "guitarra"
- Guardar títulos de la página 1
- Cambiar a la página 2
- Validar que los productos sean diferentes a los de la página 1

4. Validación de descuentos | Laptops 50% o más
- Buscar "laptop"
- Aplicar filtro “50% o más”
- Obtener precios antes y después
- calcular porcentaje de descuento
- Verificar que el descuento real sea mayor o igual a 50%

**4. EJECUCION DE LAS PRUEBAS**
1. Clonar el repositorio
     - git clone https://github.com/marco-millan-07/liverpool-test-automation.git
     - cd liverpool-test-automation
2. Instalar dependencias
     - npm install
3. Instalar los navegadores de Playwright
     - npx playwright install
4. Ejectuar todos los escenarios de prueba
     - npx cucumber-js
5. Generar el reporte(al finalizar la ejecucion)
     - node generate-report.js
     - se ubica en (reports/html/index.html)

**5. Este script genera:**
- Capturas de pantalla automaticas cuando algo falla
- Resultados JSON
- Reporte HTML navegable



/reports/html
```



