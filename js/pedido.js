// Mensajes de error comprensibles para el formulario de pedido.
// La validación real se hace con los atributos de HTML; este código solo
// muestra mensajes claros. El servidor deberá validar otra vez.
var form = document.getElementById("pedido");
var resumen = document.getElementById("resumen");
var resultado = document.getElementById("resultado");
var campos = form.querySelectorAll("input, select");

var mensajes = {
  nombre: { valueMissing: "Escribe tu nombre completo.", tooShort: "El nombre debe tener al menos 3 letras." },
  celular: { valueMissing: "Escribe tu celular.", patternMismatch: "El celular debe tener 9 dígitos y empezar en 9. Ejemplo: 951234567." },
  correo: { typeMismatch: "Escribe un correo con @, por ejemplo nombre@correo.com." },
  producto: { valueMissing: "Elige un producto de la lista." },
  cantidad: { valueMissing: "Escribe la cantidad.", rangeUnderflow: "La cantidad mínima es 1.", rangeOverflow: "La cantidad máxima es 20." }
};

function mostrarError(campo) {
  var texto = "";
  var lista = mensajes[campo.id] || {};
  if (!campo.validity.valid) {
    for (var clave in lista) {
      if (campo.validity[clave]) { texto = "✕ " + lista[clave]; break; }
    }
  }
  var aviso = document.getElementById("error-" + campo.id);
  if (aviso) { aviso.textContent = texto; }
  campo.setAttribute("aria-invalid", texto ? "true" : "false");
}

form.noValidate = true; // los mensajes los muestra este código
Array.prototype.forEach.call(campos, function (c) {
  c.addEventListener("blur", function () { mostrarError(c); });
  c.addEventListener("input", function () { if (c.getAttribute("aria-invalid") === "true") { mostrarError(c); } });
});

var contador = 3;
form.addEventListener("submit", function (e) {
  e.preventDefault();
  var primero = null, malos = 0;
  Array.prototype.forEach.call(campos, function (c) {
    mostrarError(c);
    if (!c.validity.valid) { malos++; if (!primero) { primero = c; } }
  });
  resultado.textContent = "";
  if (primero) {
    resumen.textContent = "Hay " + malos + (malos === 1 ? " campo" : " campos") + " por corregir.";
    primero.focus();
    return;
  }
  resumen.textContent = "";
  resultado.textContent = "✓ Pedido registrado (simulación). Código: PED-000" + (contador++) + ". El formulario aún no envía datos a un servidor.";
  form.reset();
});
