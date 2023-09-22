window.addEventListener('click', function () {
  const ContenedorBotones = document.querySelector(".Con");
  ContenedorBotones.style.display = "none";
  const audio = new Audio('cancion.mp3');
  // audio.play();
  document.querySelector(".Texto").style.display = "block";
  CrearVarias();
})

const canvas = document.getElementById('Flor');
const ctx = canvas.getContext('2d');

function DibujarPetalo(x, y, RadioX, scala, Rotacion, color, pasos) {
  const Numero = scala;

  const AnguloIncrement = (Math.PI / pasos) * 2;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Rotacion);
  ctx.scale(1, Numero);
  ctx.beginPath();
  for (let i = 0; i <= pasos; i++) {
    const AnguloActual = i * AnguloIncrement;
    const currentRadius = Math.sin(AnguloActual) * RadioX;
    const PuntoY = Math.sin(AnguloActual) * currentRadius;
    const PuntoX = Math.cos(AnguloActual) * currentRadius;
    if (i === 0) {
      ctx.moveTo(PuntoX, PuntoY);
    } else {
      ctx.lineTo(PuntoX, PuntoY);
    }
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}

function DibujarFlorSinTallo(x, y, NumeroPetalos, RadioXPetalo, RadioYPetalo, AltoTrazo) {
  // Dibuja el tallo
  const PasosTallo = 50;
  const AltoTallo = AltoTrazo / PasosTallo;
  let NuevaY = y;

  const DibujarTallo = () => {
    if (NuevaY < y + AltoTrazo) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, NuevaY);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'black';
      ctx.stroke();
      NuevaY += AltoTallo;
      setTimeout(DibujarTallo, 100);
    }
  };
  DibujarTallo();

  const AnguloIncrement = (Math.PI * 2) / NumeroPetalos;

  // Dibuja los pétalos
  let contadorPetalos = 0;
  function dibujarSiguientePetalo() {
    if (contadorPetalos <= NumeroPetalos) {
      const Angulo = contadorPetalos * AnguloIncrement;
      DibujarPetalo(x, y, RadioXPetalo, 2, Angulo, 'yellow', 100);
      contadorPetalos++;
      setTimeout(dibujarSiguientePetalo, 1000);
    }
    // Dibuja el centro de la flor
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  }
  dibujarSiguientePetalo();
}

function CrearVarias() {
  const numFlores = 5;

  // Espaciamiento y tamaño de cada flor
  const espacioX = canvas.width / 2;
  const espacioY = canvas.height / 3;
  const TamañoFlor = 0;

  for (let i = 0; i <= numFlores; i++) {
    const fila = Math.floor(i / 2);
    const columna = i % 2;
    const x = espacioX * columna + espacioX / 2;
    const y = espacioY * fila + espacioY / 2;

    DibujarFlorSinTallo(x, y, 8, 25, 80, TamañoFlor);
  }
}
