Feature: Búsqueda de productos tipo piano en Liverpool
  Como usuario de Liverpool
  Quiero buscar pianos
  Para validar que los resultados sean correctos y completos

  Scenario: Validar al menos 15 resultados correctos para “piano”
    Given que estoy en la página de inicio
    When busco el producto "piano"
    Then deben mostrarse al menos 15 productos
    And al menos 15 títulos deben contener la palabra "piano"
    And todos los títulos deben tener texto visible
    And todos los precios deben tener un valor visible
