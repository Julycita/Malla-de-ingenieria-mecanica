const materias = [
  // Semestre 1
  { nombre: "Cálculo Diferencial", prerrequisitos: [] },
  { nombre: "Álgebra y Trigonometría", prerrequisitos: [] },
  { nombre: "Introducción a la Ingeniería", prerrequisitos: [] },
  { nombre: "Química General", prerrequisitos: [] },
  { nombre: "Expresión Gráfica", prerrequisitos: [] },

  // Semestre 2
  { nombre: "Cálculo Integral", prerrequisitos: ["Cálculo Diferencial"] },
  { nombre: "Física Mecánica", prerrequisitos: ["Cálculo Diferencial", "Álgebra y Trigonometría"] },
  { nombre: "Algoritmia y Programación", prerrequisitos: [] },
  { nombre: "Química Orgánica", prerrequisitos: ["Química General"] },
  { nombre: "Dibujo Asistido por Computador", prerrequisitos: ["Expresión Gráfica"] },

  // Semestre 3
  { nombre: "Cálculo Multivariable", prerrequisitos: ["Cálculo Integral"] },
  { nombre: "Estática", prerrequisitos: ["Física Mecánica"] },
  { nombre: "Materiales de Ingeniería", prerrequisitos: ["Química Orgánica"] },
  { nombre: "Herramientas Computacionales", prerrequisitos: [] },
  { nombre: "Electiva de Humanidades I", prerrequisitos: [] },

  // Semestre 4
  { nombre: "Ecuaciones Diferenciales", prerrequisitos: ["Cálculo Multivariable"] },
  { nombre: "Dinámica", prerrequisitos: ["Estática"] },
  { nombre: "Termodinámica", prerrequisitos: ["Física Mecánica"] },
  { nombre: "Resistencia de Materiales", prerrequisitos: ["Estática"] },
  { nombre: "Probabilidad y Estadística", prerrequisitos: ["Cálculo Integral"] },

  // Semestre 5
  { nombre: "Mecánica de Fluidos", prerrequisitos: ["Termodinámica", "Ecuaciones Diferenciales"] },
  { nombre: "Análisis de Sistemas Mecánicos", prerrequisitos: ["Dinámica", "Resistencia de Materiales"] },
  { nombre: "Electiva Profesional I", prerrequisitos: [] },
  { nombre: "Procesos de Manufactura", prerrequisitos: ["Materiales de Ingeniería"] },
  { nombre: "Electiva de Humanidades II", prerrequisitos: [] },

  // Semestre 6
  { nombre: "Transferencia de Calor", prerrequisitos: ["Mecánica de Fluidos"] },
  { nombre: "Instrumentación y Control", prerrequisitos: ["Probabilidad y Estadística"] },
  { nombre: "Sistemas Mecatrónicos", prerrequisitos: ["Análisis de Sistemas Mecánicos"] },
  { nombre: "Electiva Profesional II", prerrequisitos: [] },
  { nombre: "Diseño de Elementos de Máquina", prerrequisitos: ["Resistencia de Materiales"] },

  // Semestre 7
  { nombre: "Proyecto Integrador I", prerrequisitos: ["Sistemas Mecatrónicos", "Transferencia de Calor"] },
  { nombre: "Automatización Industrial", prerrequisitos: ["Instrumentación y Control"] },
  { nombre: "Electiva Profesional III", prerrequisitos: [] },
  { nombre: "Gestión Empresarial", prerrequisitos: [] },
  { nombre: "Ética Profesional", prerrequisitos: [] },

  // Semestre 8
  { nombre: "Proyecto Integrador II", prerrequisitos: ["Proyecto Integrador I"] },
  { nombre: "Electiva Profesional IV", prerrequisitos: [] },
  { nombre: "Electiva de Humanidades III", prerrequisitos: [] },
  { nombre: "Práctica Profesional", prerrequisitos: ["Proyecto Integrador I"] },
  { nombre: "Trabajo de Grado", prerrequisitos: ["Proyecto Integrador II"] }
];

const malla = document.getElementById("malla");
const template = document.getElementById("materia-template");

materias.forEach(m => {
  const clone = template.content.cloneNode(true);
  const materiaEl = clone.querySelector(".materia");
  const nombreEl = clone.querySelector(".nombre");

  materiaEl.dataset.nombre = m.nombre;
  materiaEl.dataset.prerequisitos = m.prerrequisitos.join(",");
  nombreEl.textContent = m.nombre;

  malla.appendChild(clone);
});

document.addEventListener("click", (e) => {
  if (e.target.closest(".materia")) {
    const materia = e.target.closest(".materia");
    materia.classList.add("aprobada");

    const nombre = materia.dataset.nombre;
    document.querySelectorAll(".materia").forEach(destino => {
      const requisitos = destino.dataset.prerequisitos.split(",").map(r => r.trim());
      if (requisitos.includes(nombre)) {
        destino.classList.add("desbloqueada");
      }
    });
  }
});
