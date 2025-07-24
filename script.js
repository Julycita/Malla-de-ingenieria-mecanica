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
