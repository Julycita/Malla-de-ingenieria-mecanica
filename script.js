const materias = [
  // 1er semestre
  { id: "calculo1", nombre: "Cálculo I", requisitos: [], semestre: 1 },
  { id: "algebra", nombre: "Álgebra Lineal", requisitos: [], semestre: 1 },
  { id: "quimica", nombre: "Química", requisitos: [], semestre: 1 },
  { id: "introduccion", nombre: "Introducción a la Ingeniería", requisitos: [], semestre: 1 },
  { id: "comunicacion", nombre: "Comunicación", requisitos: [], semestre: 1 },

  // 2do semestre
  { id: "calculo2", nombre: "Cálculo II", requisitos: ["calculo1"], semestre: 2 },
  { id: "fisica1", nombre: "Física I", requisitos: ["calculo1"], semestre: 2 },
  { id: "dibujo", nombre: "Dibujo de Ingeniería", requisitos: [], semestre: 2 },
  { id: "metrologia", nombre: "Metrología", requisitos: [], semestre: 2 },
  { id: "programacion", nombre: "Programación", requisitos: [], semestre: 2 },

  // 3er semestre
  { id: "calculo3", nombre: "Cálculo III", requisitos: ["calculo2"], semestre: 3 },
  { id: "fisica2", nombre: "Física II", requisitos: ["fisica1", "calculo2"], semestre: 3 },
  { id: "termodinamica", nombre: "Termodinámica", requisitos: ["fisica1"], semestre: 3 },
  { id: "materiales", nombre: "Materiales", requisitos: ["quimica"], semestre: 3 },
  { id: "estatica", nombre: "Estática", requisitos: ["fisica1"], semestre: 3 },

  // 4to semestre
  { id: "ecuaciones", nombre: "Ecuaciones Diferenciales", requisitos: ["calculo3"], semestre: 4 },
  { id: "dinamica", nombre: "Dinámica", requisitos: ["estatica"], semestre: 4 },
  { id: "mecanica", nombre: "Mecánica de Materiales", requisitos: ["estatica"], semestre: 4 },
  { id: "maquinas", nombre: "Máquinas Eléctricas", requisitos: ["fisica2"], semestre: 4 },
  { id: "mecanismos", nombre: "Mecanismos", requisitos: ["dinamica"], semestre: 4 },

  // 5to semestre
  { id: "electiva1", nombre: "Electiva I", requisitos: [], semestre: 5 },
  { id: "resistencia", nombre: "Resistencia de Materiales", requisitos: ["mecanica"], semestre: 5 },
  { id: "control", nombre: "Control Automático", requisitos: ["ecuaciones"], semestre: 5 },
  { id: "procesos", nombre: "Procesos de Manufactura", requisitos: ["materiales"], semestre: 5 },
  { id: "fluidos", nombre: "Mecánica de Fluidos", requisitos: ["fisica2"], semestre: 5 },

  // Puedes seguir completando 6to a 10mo igual...
];

const container = document.querySelector(".grid");
const template = document.getElementById("template-materia");

function cargarMalla() {
  container.innerHTML = "";
  const progreso = JSON.parse(localStorage.getItem("malla")) || [];

  const semestres = {};

  materias.forEach(m => {
    if (!semestres[m.semestre]) semestres[m.semestre] = [];
    semestres[m.semestre].push(m);
  });

  for (const semestre in semestres) {
    const columna = document.createElement("div");
    columna.className = "columna-semestre";
    const titulo = document.createElement("h3");
    titulo.textContent = `Semestre ${semestre}`;
    columna.appendChild(titulo);

    semestres[semestre].forEach(m => {
      const clone = template.content.cloneNode(true);
      const div = clone.querySelector(".materia");
      div.dataset.id = m.id;
      div.querySelector(".nombre").textContent = m.nombre;

      if (progreso.includes(m.id)) {
        div.classList.add("aprobada");
      } else if (!m.requisitos.length || m.requisitos.every(id => progreso.includes(id))) {
        // materia desbloqueada
      } else {
        div.classList.add("bloqueada");
        const tooltip = div.querySelector(".tooltip");
        tooltip.textContent = "Requiere: " + m.requisitos.map(id => {
          const mat = materias.find(mat => mat.id === id);
          return mat?.nombre || id;
        }).join(", ");
      }

      div.onclick = () => marcarMateria(div);
      columna.appendChild(clone);
    });

    container.appendChild(columna);
  }
}

function marcarMateria(el) {
  if (el.classList.contains("bloqueada")) return;

  el.classList.toggle("aprobada");

  const id = el.dataset.id;
  let progreso = JSON.parse(localStorage.getItem("malla")) || [];

  if (el.classList.contains("aprobada")) {
    if (!progreso.includes(id)) progreso.push(id);
  } else {
    progreso = progreso.filter(i => i !== id);
  }

  localStorage.setItem("malla", JSON.stringify(progreso));
  cargarMalla(); // Recargar para actualizar el estado
}

function reiniciarMalla() {
  localStorage.removeItem("malla");
  cargarMalla();
}

function toggleModo() {
  document.body.classList.toggle("modo-oscuro");
}

cargarMalla();
  
