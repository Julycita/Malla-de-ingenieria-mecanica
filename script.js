const materias = [
  // Semestre 1
  { nombre: "Cálculo diferencial", semestre: 1 },
  { nombre: "Álgebra y trigonometría", semestre: 1 },
  { nombre: "Geometría vectorial", semestre: 1 },
  { nombre: "Introducción a la ingeniería", semestre: 1 },
  { nombre: "Química general", semestre: 1 },
  { nombre: "Lectura y escritura académica", semestre: 1 },

  // Semestre 2
  { nombre: "Cálculo integral", semestre: 2, prerrequisitos: ["Cálculo diferencial"] },
  { nombre: "Física mecánica", semestre: 2, prerrequisitos: ["Álgebra y trigonometría", "Geometría vectorial"] },
  { nombre: "Álgebra lineal", semestre: 2 },
  { nombre: "Dibujo de ingeniería", semestre: 2 },
  { nombre: "Química aplicada", semestre: 2, prerrequisitos: ["Química general"] },
  { nombre: "Competencias ciudadanas", semestre: 2 },

  // Semestre 3
  { nombre: "Ecuaciones diferenciales", semestre: 3, prerrequisitos: ["Cálculo integral"] },
  { nombre: "Cálculo vectorial", semestre: 3, prerrequisitos: ["Cálculo integral"] },
  { nombre: "Física electricidad y magnetismo", semestre: 3, prerrequisitos: ["Física mecánica"] },
  { nombre: "Estática", semestre: 3, prerrequisitos: ["Física mecánica"] },
  { nombre: "Materiales de ingeniería", semestre: 3, prerrequisitos: ["Química aplicada"] },
  { nombre: "Inglés I", semestre: 3 },

  // Semestre 4
  { nombre: "Probabilidad y estadística", semestre: 4 },
  { nombre: "Dinámica", semestre: 4, prerrequisitos: ["Estática"] },
  { nombre: "Termodinámica", semestre: 4, prerrequisitos: ["Física electricidad y magnetismo"] },
  { nombre: "Resistencia de materiales", semestre: 4, prerrequisitos: ["Estática", "Materiales de ingeniería"] },
  { nombre: "Procesos de manufactura", semestre: 4 },
  { nombre: "Inglés II", semestre: 4 },

  // Semestre 5
  { nombre: "Mecánica de fluidos", semestre: 5, prerrequisitos: ["Termodinámica"] },
  { nombre: "Análisis de mecanismos", semestre: 5, prerrequisitos: ["Dinámica"] },
  { nombre: "Electiva humanística I", semestre: 5 },
  { nombre: "Electiva profesional I", semestre: 5 },
  { nombre: "Mediciones e instrumentos", semestre: 5 },
  { nombre: "Inglés III", semestre: 5 },

  // Semestre 6
  { nombre: "Transferencia de calor", semestre: 6, prerrequisitos: ["Mecánica de fluidos"] },
  { nombre: "Análisis de esfuerzos", semestre: 6, prerrequisitos: ["Resistencia de materiales"] },
  { nombre: "Máquinas hidráulicas", semestre: 6, prerrequisitos: ["Mecánica de fluidos"] },
  { nombre: "Electiva humanística II", semestre: 6 },
  { nombre: "Electiva profesional II", semestre: 6 },
  { nombre: "Inglés IV", semestre: 6 },
];

const malla = document.getElementById("malla");
const template = document.getElementById("materia-template");

const aprobadas = new Set(JSON.parse(localStorage.getItem("materiasAprobadas") || "[]"));

function renderizarMalla() {
  malla.innerHTML = "";

  const maxSemestre = Math.max(...materias.map(m => m.semestre));
  malla.style.gridTemplateColumns = `repeat(${maxSemestre}, 1fr)`;

  for (let i = 1; i <= maxSemestre; i++) {
    const columna = document.createElement("div");
    columna.classList.add("columna");

    const encabezado = document.createElement("h2");
    encabezado.textContent = `Semestre ${i}`;
    columna.appendChild(encabezado);

    const materiasDelSemestre = materias.filter(m => m.semestre === i);
    for (const materia of materiasDelSemestre) {
      const clone = template.content.cloneNode(true);
      const divMateria = clone.querySelector(".materia");
      const nombreSpan = clone.querySelector(".nombre");

      nombreSpan.textContent = materia.nombre;
      divMateria.dataset.nombre = materia.nombre;

      if (aprobadas.has(materia.nombre)) {
        divMateria.classList.add("aprobada");
      } else if (
        !materia.prerrequisitos ||
        materia.prerrequisitos.every(pr => aprobadas.has(pr))
      ) {
        divMateria.classList.add("desbloqueada");
      } else {
        divMateria.classList.add("bloqueada");
      }

      divMateria.addEventListener("click", () => {
        if (divMateria.classList.contains("bloqueada")) return;

        if (aprobadas.has(materia.nombre)) {
          aprobadas.delete(materia.nombre);
        } else {
          aprobadas.add(materia.nombre);
        }
        localStorage.setItem("materiasAprobadas", JSON.stringify([...aprobadas]));
        renderizar();
      });

      columna.appendChild(divMateria);
    }

    malla.appendChild(columna);
  }
}

document.getElementById("modoToggle").addEventListener("click", () => {
  document.body.classList.toggle("oscuro");
  localStorage.setItem("modoOscuro", document.body.classList.contains("oscuro"));
});

document.getElementById("reiniciarBtn").addEventListener("click", () => {
  if (confirm("¿Seguro que quieres reiniciar la malla?")) {
    localStorage.removeItem("materiasAprobadas");
    aprobadas.clear();
    renderizar();
  }
});

if (localStorage.getItem("modoOscuro") === "true") {
  document.body.classList.add("oscuro");
}

renderizar();
