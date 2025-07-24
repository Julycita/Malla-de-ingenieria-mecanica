let estadoMaterias = JSON.parse(localStorage.getItem("estadoMaterias")) || {};

// Cargar estado al iniciar
window.addEventListener("DOMContentLoaded", () => {
  const materias = document.querySelectorAll(".materia");

  materias.forEach(materia => {
    const nombre = materia.dataset.nombre;

    if (estadoMaterias[nombre]) {
      materia.classList.add("aprobada");
    }

    materia.addEventListener("click", () => {
      const estaAprobada = materia.classList.toggle("aprobada");
      estadoMaterias[nombre] = estaAprobada;
      guardarEstado();
      actualizarDesbloqueos();
    });
  });

  actualizarDesbloqueos();
});

function guardarEstado() {
  localStorage.setItem("estadoMaterias", JSON.stringify(estadoMaterias));
  console.log("Estado guardado:", estadoMaterias);
}

function actualizarDesbloqueos() {
  const materias = document.querySelectorAll(".materia");

  materias.forEach(materia => {
    const requisitos = materia.dataset.requisitos ? materia.dataset.requisitos.split(",") : [];
    const nombre = materia.dataset.nombre;

    if (estadoMaterias[nombre]) {
      materia.classList.remove("bloqueada");
      return;
    }

    const puedeDesbloquearse = requisitos.every(req => estadoMaterias[req]);

    if (puedeDesbloquearse) {
      materia.classList.remove("bloqueada");
    } else {
      materia.classList.add("bloqueada");
    }
  });
}

// Modo oscuro / claro
const toggleButton = document.getElementById("modo-toggle");
const body = document.body;

function aplicarModo(modo) {
  if (modo === "oscuro") {
    body.classList.add("oscuro");
    toggleButton.textContent = "🌞";
  } else {
    body.classList.remove("oscuro");
    toggleButton.textContent = "🌙";
  }
}

// Cargar modo desde localStorage
const modoGuardado = localStorage.getItem("modo") || "claro";
aplicarModo(modoGuardado);

// Cambiar modo con el botón
toggleButton.addEventListener("click", () => {
  const nuevoModo = body.classList.contains("oscuro") ? "claro" : "oscuro";
  aplicarModo(nuevoModo);
  localStorage.setItem("modo", nuevoModo);
});
// Cargar estado guardado o iniciar vacío
let estadoMaterias = JSON.parse(localStorage.getItem("estadoMaterias")) || {};

function actualizarMaterias() {
  document.querySelectorAll(".materia").forEach(materia => {
    const nombre = materia.dataset.nombre;
    const requisitos = materia.dataset.prerrequisitos?.split(";") || [];
    const aprobada = estadoMaterias[nombre];

    if (aprobada) {
      materia.classList.add("aprobada");
      materia.classList.remove("desbloqueada");
      materia.style.cursor = "default";
    } else {
      // Verifica si todos los requisitos están aprobados
      const desbloqueada = requisitos.every(req => estadoMaterias[req]);
      if (requisitos.length === 0 || desbloqueada) {
        materia.classList.add("desbloqueada");
        materia.classList.remove("aprobada");
      } else {
        materia.classList.remove("desbloqueada");
        materia.classList.remove("aprobada");
      }
    }
  });
}

function guardarEstado() {
  localStorage.setItem("estadoMaterias", JSON.stringify(estadoMaterias));
}

document.querySelectorAll(".materia").forEach(materia => {
  materia.addEventListener("click", () => {
    const nombre = materia.dataset.nombre;
    const desbloqueada = materia.classList.contains("desbloqueada");

    if (!desbloqueada) return;

    estadoMaterias[nombre] = !estadoMaterias[nombre];
    guardarEstado();
    actualizarMaterias();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  actualizarMaterias();

  const modoBtn = document.getElementById("modoBtn");
  const body = document.body;

  const modoGuardado = localStorage.getItem("modo");
  if (modoGuardado === "oscuro") {
    body.classList.add("oscuro");
    modoBtn.textContent = "🌞";
  }

  modoBtn.addEventListener("click", () => {
    body.classList.toggle("oscuro");
    const enModoOscuro = body.classList.contains("oscuro");
    modoBtn.textContent = enModoOscuro ? "🌞" : "🌙";
    localStorage.setItem("modo", enModoOscuro ? "oscuro" : "claro");
  });
});
