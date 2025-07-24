const materias = {
  "1": [
    { nombre: "Cálculo I", id: "calculo1", requisitos: [] },
    { nombre: "Álgebra Lineal", id: "algebra", requisitos: [] },
    { nombre: "Química", id: "quimica", requisitos: [] },
    { nombre: "Introducción a la Ingeniería", id: "introIng", requisitos: [] },
    { nombre: "Comunicación Escrita", id: "comunicacion", requisitos: [] }
  ],
  "2": [
    { nombre: "Cálculo II", id: "calculo2", requisitos: ["calculo1"] },
    { nombre: "Física I", id: "fisica1", requisitos: ["calculo1"] },
    { nombre: "Estática", id: "estatica", requisitos: ["algebra"] },
    { nombre: "Dibujo Técnico", id: "dibujo", requisitos: [] },
    { nombre: "Programación", id: "programacion", requisitos: [] }
  ],
  // Puedes seguir agregando más semestres aquí
};

const malla = document.getElementById("malla");
const template = document.getElementById("materia-template");
const modoToggle = document.getElementById("modoToggle");
const reiniciarBtn = document.getElementById("reiniciarBtn");

let estadoMaterias = JSON.parse(localStorage.getItem("estadoMaterias")) || {};

function crearMalla() {
  malla.innerHTML = "";

  for (const semestre in materias) {
    const columna = document.createElement("div");
    columna.classList.add("columna");
    const titulo = document.createElement("h2");
    titulo.textContent = `Semestre ${semestre}`;
    columna.appendChild(titulo);

    materias[semestre].forEach(materia => {
      const clon = template.content.cloneNode(true);
      const divMateria = clon.querySelector(".materia");
      const nombreSpan = clon.querySelector(".nombre");
      const tooltip = clon.querySelector(".tooltip");

      divMateria.dataset.id = materia.id;
      nombreSpan.textContent = materia.nombre;
      tooltip.textContent = materia.requisitos.length
        ? `Requiere: ${materia.requisitos.map(id => buscarNombreMateria(id)).join(", ")}`
        : "Sin prerrequisitos";

      if (estadoMaterias[materia.id]) {
        divMateria.classList.add("aprobada");
      }

      if (puedeActivarse(materia)) {
        divMateria.classList.add("activa");
      }

      divMateria.addEventListener("click", () => {
        if (!puedeActivarse(materia)) return;

        estadoMaterias[materia.id] = !estadoMaterias[materia.id];
        localStorage.setItem("estadoMaterias", JSON.stringify(estadoMaterias));
        crearMalla();
      });

      columna.appendChild(clon);
    });

    malla.appendChild(columna);
  }
}

function puedeActivarse(materia) {
  return materia.requisitos.every(req => estadoMaterias[req]);
}

function buscarNombreMateria(id) {
  for (const semestre in materias) {
    for (const mat of materias[semestre]) {
      if (mat.id === id) return mat.nombre;
    }
  }
  return id;
}

modoToggle.addEventListener("click", () => {
  document.body.classList.toggle("oscuro");
  localStorage.setItem("modoOscuro", document.body.classList.contains("oscuro"));
});

reiniciarBtn.addEventListener("click", () => {
  localStorage.removeItem("estadoMaterias");
  estadoMaterias = {};
  crearMalla();
});

if (localStorage.getItem("modoOscuro") === "true") {
  document.body.classList.add("oscuro");
}

crearMalla();
