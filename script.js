const wheel = document.getElementById("wheel");
const result = document.getElementById("result");
const inputsContainer = document.getElementById("inputsContainer");
const form = document.getElementById("optionsForm");

let options = ["Burguer🍔", "Suchi🍣", "Pizza🍕", "Perro🌭", "Pollo🍗", "Ramen🍜", "Burrito🌯", "Creps🧇", "Coctel🍸"];
let spinning = false;
let currentRotation = 0;

let optimizar = false;
let numeroClaseOptimizada = 2


function actualizarPage() {
  window.location.href = window.location.href;
}

function optimiza(){
  if(optimizar == false){
    optimizar = true;
    numeroClaseOptimizada = 1;
  } else{
    optimizar = false;
    numeroClaseOptimizada = 2;
  }

  renderWheel(); // 🔁 ¡Vuelve a renderizar la ruleta!
}

const input = document.getElementById('miInput');
  let valorGuardado = '20';

  input.addEventListener('blur', () => {
    valorGuardado = input.value;
    console.log('Guardado:', valorGuardado);
  });



// Función para crear los inputs del formulario
function renderFormInputs() {
  inputsContainer.innerHTML = ""; // limpiar
  options.forEach((option, index) => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = option;
    input.name = `option-${index}`;
    input.placeholder = `Opción ${index + 1}`;
    inputsContainer.appendChild(input);
  });
}

// Función para renderizar la ruleta
function renderWheel() {
  wheel.innerHTML = "";
  options.forEach((option, index) => {
    const segment = document.createElement("div");
    segment.className = `segment${numeroClaseOptimizada}`;
    segment.style.setProperty("--i", index);
    segment.innerHTML = `<p>${option}</p>`;
    wheel.appendChild(segment);
  });
}

// Girar la ruleta
function spin() {
  if (spinning) return;
  spinning = true;

  const tickSound = document.getElementById("tickSound");
  const tickSound2 = document.getElementById("tickSound2");

  const extraRotation = Math.floor(3600 + Math.random() * 720);
  const finalRotation = currentRotation + extraRotation;
  const duration = `${valorGuardado}000`; // 10 segundos
  const segmentAngle = 360 / options.length;

  let start = null;
  let lastTick = -1;

  function animate(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic
   const easedProgress = 1 - Math.pow(1 - progress, 2.5);
    const currentAngle = currentRotation + (finalRotation - currentRotation) * easedProgress;
    wheel.style.transform = `rotate(${currentAngle}deg)`;

    // Reproducir tick si cambia de segmento
    const degrees = currentAngle % 360;
    const tickIndex = Math.floor(degrees / segmentAngle);
    if (tickIndex !== lastTick) {
      tickSound.currentTime = 0;
      tickSound.play();
      lastTick = tickIndex;
    }

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      currentRotation = finalRotation;
      const finalDegrees = currentRotation % 360;
      const selectedIndex = Math.floor(finalDegrees / segmentAngle);
      const realIndex = (options.length - selectedIndex) % options.length;
      result.textContent = "Resultado: " + options[realIndex];
      spinning = false;
      tickSound2.play();
       // 🎉 Llamar confeti al finalizar
  for (let i = 0; i < 10; i++) {
  confetti({
    particleCount: 250,
    spread: 360,
    origin: {
      x: Math.random(),
      y: Math.random(),
    }
  });
}
    }
  }

  requestAnimationFrame(animate);
}


// Al enviar el formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newOptions = [];
  const inputs = inputsContainer.querySelectorAll("input");
  inputs.forEach((input) => {
    const value = input.value.trim();
    if (value !== "") newOptions.push(value);
  });

  // Validar que todos estén llenos
  if (newOptions.length !== inputs.length) {
    alert("Todos los campos deben estar llenos.");
    return;
  }

  options = newOptions;
  renderFormInputs();
  renderWheel();
});

// Inicializar
renderFormInputs();
renderWheel();
