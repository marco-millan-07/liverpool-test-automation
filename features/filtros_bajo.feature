Feature: Filtros de búsqueda para bajos electrónicos
  Como usuario de Liverpool
  Quiero aplicar filtros de marca y precio
  Para ver productos que cumplan mis criterios

  Scenario: Aplicar filtros de marca y precio en la búsqueda “bajo electrónico”
    Given que estoy en la página de inicio de Liverpool
    And realizo una búsqueda de "bajo electrónico"
    When aplico el filtro de marca Fender
    And aplico el filtro de precio entre 5000 y 10000 pesos
    Then todos los resultados deben pertenecer a la marca Fender
    And todos los precios deben estar dentro del rango 5000 a 10000 pesos
