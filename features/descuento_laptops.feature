Feature: Validación de descuentos del 50% o más en Laptops
  Como usuario de Liverpool
  Quiero aplicar el filtro de 50% o más de descuento en laptops
  Para validar que los productos realmente cumplen con el descuento aplicado

  Scenario: Validar matemáticamente que los descuentos son del 50% o más
    Given que navego a la categoría de Laptops
    When aplico el filtro de "50% o más de descuento"
    Then todos los productos deben tener un descuento real del 50% o mayor
