const materias = [
  // SEMESTRE 1
  { id: "calculo1", nombre: "Cálculo I", requisitos: [] },
  { id: "quimica", nombre: "Química General", requisitos: [] },
  { id: "algebra", nombre: "Álgebra Lineal", requisitos: [] },
  { id: "introIng", nombre: "Introducción a la Ingeniería", requisitos: [] },
  { id: "comunicacion", nombre: "Comunicación Oral y Escrita", requisitos: [] },
  { id: "dep1", nombre: "Deportes 1", requisitos: [] },

  // SEMESTRE 2
  { id: "calculo2", nombre: "Cálculo II", requisitos: ["calculo1"] },
  { id: "fisica1", nombre: "Física I", requisitos: ["calculo1"] },
  { id: "dibujo", nombre: "Dibujo de Ingeniería", requisitos: [] },
  { id: "historia", nombre: "Historia de la Ingeniería", requisitos: [] },
  { id: "dep2", nombre: "Deportes 2", requisitos: ["dep1"] },

  // SEMESTRE 3
  { id: "calculo3", nombre: "Cálculo III", requisitos: ["calculo2"] },
  { id: "fisica2", nombre: "Física II", requisitos: ["fisica1", "calculo2"] },
  { id: "termodinamica1", nombre: "Termodinámica I", requisitos: ["fisica1"] },
  { id: "mecanica", nombre: "Mecánica Vectorial", requisitos: ["fisica1"] },
  { id: "programacion", nombre: "Programación", requisitos: [] },

  // SEMESTRE 4
  { id: "ecuaciones", nombre: "Ecuaciones Diferenciales", requisitos: ["calculo3"] },
  { id: "dinamica", nombre: "Dinámica", requisitos: ["mecanica"] },
  { id: "estatica", nombre: "Estática", requisitos: ["mecanica"] },
  { id: "resistencia", nombre: "Resistencia de Materiales", requisitos: ["estatica"] },
  { id: "electiva1", nombre: "Electiva I", requisitos: [] },

  // SEMESTRE 5
  { id: "termodinamica2", nombre: "Termodinámica II", requisitos: ["termodinamica1"] },
  { id: "materiales", nombre: "Ciencia de los Materiales", requisitos: ["quimica"] },
  { id: "flujo", nombre: "Mecánica de Fluidos", requisitos: ["fisica2", "calculo3"] },
  { id: "manufactura", nombre: "Procesos de Manufactura", requisitos: ["materiales"] },
  { id: "probabilidad", nombre: "Probabilidad y Estadística", requisitos: ["calculo2"] },

  // SEMESTRE 6
  { id: "maquinas1", nombre: "Máquinas Térmicas I", requisitos: ["termodinamica2"] },
  { id: "control", nombre: "Automatización y Control", requisitos: ["fisica2", "programacion"] },
  { id: "diseno", nombre: "Diseño de Elementos de Máquinas", requisitos: ["resistencia"] },
  { id: "electiva2", nombre: "Electiva II", requisitos: ["electiva1"] },
  { id: "gestion", nombre: "Gestión Empresarial", requisitos: [] },

  // SEMESTRE 7
  { id: "maquinas2", nombre: "Máquinas Térmicas II", requisitos: ["maquinas1"] },
  { id: "sistemasFluidos", nombre: "Sistemas de Fluidos", requisitos: ["flujo"] },
  { id: "vibraciones", nombre: "Vibraciones Mecánicas", requisitos: ["dinamica"] },
  { id: "electiva3", nombre: "Electiva III", requisitos: ["electiva2"] },
  { id: "proyecto1", nombre: "Proyecto I", requisitos: ["gestion"] },

  // SEMESTRE 8
  { id: "transferencia", nombre: "Transferencia de Calor", requisitos: ["flujo", "termodinamica2"] },
  { id: "sistemasMecanicos", nombre: "Sistemas Mecánicos", requisitos: ["diseno", "vibraciones"] },
  { id: "electiva4", nombre: "Electiva IV", requisitos: ["electiva3"] },
  { id: "proyecto2", nombre: "Proyecto II", requisitos: ["proyecto1"] },

  // SEMESTRE 9
  { id: "electiva5", nombre: "Electiva V", requisitos: ["electiva4"] },
  { id: "trabajoGrado", nombre: "Trabajo de Grado", requisitos: ["proyecto2"] }
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
      // habilitado
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
  cargarMalla();
}

function reiniciarMalla() {
  localStorage.removeItem("malla");
  cargarMalla();
}

function toggleModo() {
  document.body.classList.toggle("modo-oscuro");
}

cargarMalla();
   
