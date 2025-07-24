const materias = [
  // Semestre 1
  { id: "calculo1", nombre: "Cálculo I", requisitos: [] },
  { id: "quimica", nombre: "Química", requisitos: [] },
  { id: "dibujo", nombre: "Dibujo de Ingeniería", requisitos: [] },
  { id: "algebra", nombre: "Álgebra Lineal", requisitos: [] },
  { id: "introduccion", nombre: "Introducción a la Ingeniería", requisitos: [] },
  { id: "comunicacion", nombre: "Comunicación Oral y Escrita", requisitos: [] },

  // Semestre 2
  { id: "calculo2", nombre: "Cálculo II", requisitos: ["calculo1"] },
  { id: "fisica1", nombre: "Física I", requisitos: ["calculo1"] },
  { id: "estatica", nombre: "Estática", requisitos: ["dibujo"] },
  { id: "algoritmos", nombre: "Algoritmos y Programación", requisitos: [] },
  { id: "ingles1", nombre: "Inglés I", requisitos: [] },

  // Semestre 3
  { id: "calculo3", nombre: "Cálculo III", requisitos: ["calculo2"] },
  { id: "fisica2", nombre: "Física II", requisitos: ["fisica1", "calculo2"] },
  { id: "dinamica", nombre: "Dinámica", requisitos: ["estatica"] },
  { id: "termodinamica1", nombre: "Termodinámica I", requisitos: ["fisica1"] },
  { id: "materiales", nombre: "Ciencia de los Materiales", requisitos: ["quimica", "fisica1"] },
  { id: "ingles2", nombre: "Inglés II", requisitos: ["ingles1"] },

  // Semestre 4
  { id: "ecuaciones", nombre: "Ecuaciones Diferenciales", requisitos: ["calculo3"] },
  { id: "mecanica", nombre: "Mecánica de Materiales", requisitos: ["materiales", "dinamica"] },
  { id: "sistemas", nombre: "Sistemas de Manufactura", requisitos: ["materiales"] },
  { id: "termodinamica2", nombre: "Termodinámica II", requisitos: ["termodinamica1"] },
  { id: "ingles3", nombre: "Inglés III", requisitos: ["ingles2"] },

  // Semestre 5
  { id: "electiva1", nombre: "Electiva Humanística I", requisitos: [] },
  { id: "economia", nombre: "Economía", requisitos: [] },
  { id: "electromagnetismo", nombre: "Electromagnetismo", requisitos: ["fisica2"] },
  { id: "flujo", nombre: "Mecánica de Fluidos", requisitos: ["ecuaciones", "termodinamica2"] },
  { id: "resistencia", nombre: "Resistencia de Materiales", requisitos: ["mecanica"] },

  // Semestre 6
  { id: "control", nombre: "Control Automático", requisitos: ["algoritmos", "ecuaciones"] },
  { id: "gestion", nombre: "Gestión Empresarial", requisitos: ["economia"] },
  { id: "transferencia", nombre: "Transferencia de Calor", requisitos: ["termodinamica2", "flujo"] },
  { id: "mecanismos", nombre: "Mecanismos", requisitos: ["dinamica"] },
  { id: "electiva2", nombre: "Electiva Profesional I", requisitos: [] },

  // Semestre 7
  { id: "energia", nombre: "Energía y Medio Ambiente", requisitos: [] },
  { id: "instrumentacion", nombre: "Instrumentación y Medidas", requisitos: ["control"] },
  { id: "procesos", nombre: "Procesos de Manufactura", requisitos: ["sistemas", "flujo"] },
  { id: "diseño1", nombre: "Diseño de Máquinas I", requisitos: ["resistencia", "mecanismos"] },
  { id: "electiva3", nombre: "Electiva Profesional II", requisitos: [] },

  // Semestre 8
  { id: "proyecto1", nombre: "Proyecto de Grado I", requisitos: ["gestion", "diseño1"] },
  { id: "mantenimiento", nombre: "Mantenimiento Industrial", requisitos: ["procesos"] },
  { id: "diseño2", nombre: "Diseño de Máquinas II", requisitos: ["diseño1"] },
  { id: "simulacion", nombre: "Simulación", requisitos: ["control"] },
  { id: "electiva4", nombre: "Electiva Humanística II", requisitos: ["electiva1"] },

  // Semestre 9
  { id: "proyecto2", nombre: "Proyecto de Grado II", requisitos: ["proyecto1"] },
  { id: "practica", nombre: "Práctica Profesional", requisitos: ["procesos"] },
  { id: "electiva5", nombre: "Electiva Profesional III", requisitos: ["electiva2", "electiva3"] }
];

const container = document.querySelector(".grid");
const template = document.getElementById("template-materia");

function cargarMalla() {
  container.innerHTML = "";
  const progreso = JSON.parse(localStorage.getItem("malla")) || [];

  materias.forEach(m => {
    const clone = template.content.cloneNode(true);
    const div = clone.querySelector(".materia");
    div.dataset.id = m.id;
    div.querySelector(".nombre").textContent = m.nombre;

    if (progreso.includes(m.id)) {
      div.classList.add("aprobada");
    } else if (!m.requisitos.length || m.requisitos.every(id => progreso.includes(id))) {
      // Sin requisitos o todos cumplidos: habilitado
    } else {
      div.classList.add("bloqueada");
      const tooltip = div.querySelector(".tooltip");
      tooltip.textContent = "Requiere: " + m.requisitos.map(id => {
        const mat = materias.find(mat => mat.id === id);
        return mat?.nombre || id;
      }).join(", ");
    }

    container.appendChild(clone);
  });
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
  cargarMalla(); // Recargar para desbloquear nuevas materias
}

function reiniciarMalla() {
  localStorage.removeItem("malla");
  cargarMalla();
}

function toggleModo() {
  document.body.classList.toggle("modo-oscuro");
}

cargarMalla();
