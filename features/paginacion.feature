Feature: Validar paginación en resultados de búsqueda
  Como usuario de Liverpool
  Quiero navegar entre páginas del catálogo
  Para asegurar que la paginación funcione correctamente

  Scenario: Verificar que la segunda página muestra productos diferentes
    Given que estoy en la página de inicio de Liverpool
    When busco el producto "guitarra"
    And capturo los títulos de la página 1
    And navego a la página 2
    Then los productos deben ser diferentes a los de la página 1
    And la página actual debe ser la número 2
