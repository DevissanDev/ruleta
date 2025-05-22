const wheel = document.getElementById("wheel");
const result = document.getElementById("result");
const options = ["Beso", "Abrazo", "Película", "Cena", "Paseo", "Baile", "otro7", "otro8","otro9"];
let spinning = false;
let currentRotation = 0;


function spin() {
  if (spinning === true){
    return;
  } else{
     spinning = true;
  }
  const extraRotation = Math.floor(3600 + Math.random() * 720); // 10 a 12 vueltas
  currentRotation += extraRotation;
  console.log(extraRotation)

  wheel.style.transform = `rotate(${currentRotation}deg)`;

  const finalDegrees = currentRotation % 360;
  const selectedIndex = Math.floor(finalDegrees / 40);
  const realIndex = (9 - selectedIndex) % 9;

  setTimeout(() => {
    result.textContent = "Resultado: " + options[realIndex];
    spinning = false;
  }, 10000);
}
