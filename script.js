// Comprueba si el navegador soporta la propiedad CSS '(top: calc(sin(1) * 1px))'
const canTrig = CSS.supports('(top: calc(sin(1) * 1px))');

// Obtiene el elemento con la clase 'text-ring' y lo asigna a la constante HEADING
const HEADING = document.querySelector('.text-ring');

// Define las opciones iniciales
let OPTIONS = {
  SPACING: 1,
  SIZE: 1,
  TEXT: 'Texto circular entreunosyceros.net • ',
  IMAGE_PATH: 'logo.png'
};
 
// Función que actualiza el contenido y estilo del texto giratorio
const onUpdate = () => {
  let text = OPTIONS.TEXT;
  const chars = text.split('');
  HEADING.innerHTML = '';
  HEADING.style.setProperty('--char-count', chars.length);

  // Crea elementos span para cada carácter del texto
  for (let c = 0; c < chars.length; c++) {
    HEADING.innerHTML += `<span aria-hidden="true" class="char" style="--char-index: ${c};">${chars[c]}</span>`;
  }
  HEADING.innerHTML += `<span class="sr-only">${OPTIONS.TEXT}</span>`;

  HEADING.style.setProperty('--font-size', OPTIONS.SIZE);
  HEADING.style.setProperty('--character-width', OPTIONS.SPACING);
  HEADING.style.setProperty(
    '--radius',
    canTrig ?
      'calc((var(--character-width) / sin(var(--inner-angle))) * -1ch' :
      `calc((${OPTIONS.SPACING} / ${Math.sin(360 / HEADING.children.length / (180 / Math.PI))}) * -1ch)`);

  // Obtiene el elemento de imagen y actualiza su src
  const imageElement = document.querySelector('.circle-image');
  imageElement.src = OPTIONS.IMAGE_PATH;
};

// Función que cambia el texto según la entrada del usuario
function changeText() {
  let newText = document.getElementById('newText').value;

  // Asegura que el nuevo texto tenga la misma longitud que el texto original
  if (newText.length < OPTIONS.TEXT.length) {
    newText += ' '.repeat(OPTIONS.TEXT.length - newText.length)+ ' • ';
  } else if (newText.length > OPTIONS.TEXT.length) {
    newText = newText.slice(0, OPTIONS.TEXT.length - 4) + '...' + '•';
  }

  OPTIONS.TEXT = newText;
  onUpdate();
}

// Llama a la función onUpdate para inicializar el texto giratorio
onUpdate();

// Función que borra el contenido de la caja de texto
function borrarTexto() {
  document.getElementById("newText").value = ""; // Establece el valor de la caja de texto como una cadena vacía
}