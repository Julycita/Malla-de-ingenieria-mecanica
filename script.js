materias_aprobadas / materias_totales * 100
const materias = [
  { nombre: "Seminario de Ingeniería Mecánica", requisitos: [], semestre: 1 },
  { nombre: "Dibujo Básico", requisitos: [], semestre: 1 },
  { nombre: "Química General I", requisitos: [], semestre: 1 },
  { nombre: "Español", requisitos: [], semestre: 1 },
  { nombre: "Cálculo I", requisitos: [], semestre: 1 },
  { nombre: "Electiva de Contexto I", requisitos: [], semestre: 1 },
  { nombre: "Química General II", requisitos: ["Química General I"], semestre: 2 },
  { nombre: "Física I", requisitos: ["Cálculo I"], semestre: 2 },
  { nombre: "Cálculo II", requisitos: ["Cálculo I"], semestre: 2 },
  { nombre: "Álgebra Lineal", requisitos: ["Cálculo I"], semestre: 2 },
  { nombre: "Electiva de Contexto II", requisitos: ["Electiva de Contexto I"], semestre: 2 },
  { nombre: "Dibujo mecanico", requisitos: ["Dibujo Básico"], semestre: 3 },
  { nombre: "Geometría Descriptiva", requisitos: ["Dibujo Básico"], semestre: 3 },
  { nombre: "Materiales de Ingeniería", requisitos: ["Química General II"], semestre: 3 },
  { nombre: "Física II", requisitos: ["Física I"], semestre: 3 },
  { nombre: "Cálculo Vectorial", requisitos: ["Cálculo II"], semestre: 3 },
  { nombre: "Ecuaciones Diferenciales", requisitos: ["Cálculo II"], semestre: 3 },
  { nombre: "Estadística", requisitos: ["Álgebra Lineal"], semestre: 3 },
  { nombre: "Metrología", requisitos: ["Dibujo mecanico"], semestre: 4 },
  { nombre: "Tratamientos Térmicos", requisitos: ["Materiales de Ingeniería"], semestre: 4 },
  { nombre: "Estática", requisitos: ["Física II"], semestre: 4 },
  { nombre: "Física Electromagnética", requisitos: ["Física II"], semestre: 4 },
  { nombre: "Informática para Ingenieros I", requisitos: ["Metrología"], semestre: 5 },
  { nombre: "Resistencia de Materiales", requisitos: ["Estática"], semestre: 5 },
  { nombre: "Dinámica", requisitos: ["Estática"], semestre: 5 },
  { nombre: "Matemáticas Aplicadas a la Ingeniería Mecánica", requisitos: ["Ecuaciones Diferenciales"], semestre: 5 },
  { nombre: "Introducción a la Economía", requisitos: [], semestre: 5 },
  { nombre: "Procesos de Manufactura I", requisitos: ["Informática para Ingenieros I"], semestre: 6 },
  { nombre: "Teoría de Mecanismos y Máquinas", requisitos: ["Dinámica"], semestre: 6 },
  { nombre: "Mecánica de Fluidos", requisitos: ["Dinámica"], semestre: 6 },
  { nombre: "Termodinámica I", requisitos: ["Matemáticas Aplicadas a la Ingeniería Mecánica"], semestre: 6 },
  { nombre: "Electiva de Contexto III", requisitos: ["Electiva de Contexto II"], semestre: 6 },
  { nombre: "Electrotecnia", requisitos: ["Física Electromagnética"], semestre: 7 },
  { nombre: "Procesos de Manufactura II", requisitos: ["Procesos de Manufactura I"], semestre: 7 },
  { nombre: "Diseño Mecánico", requisitos: ["Teoría de Mecanismos y Máquinas"], semestre: 7 },
  { nombre: "Termodinámica II", requisitos: ["Termodinámica I"], semestre: 7 },
  { nombre: "Hidráulica y Neumática", requisitos: ["Electrotecnia"], semestre: 8 },
  { nombre: "Diseño Mecánico II", requisitos: ["Diseño Mecánico"], semestre: 8 },
  { nombre: "Máquinas Hidráulicas", requisitos: ["Mecánica de Fluidos"], semestre: 8 },
  { nombre: "Transferencia de Calor", requisitos: ["Termodinámica II"], semestre: 8 },
  { nombre: "Ingeniería Económica", requisitos: ["Introducción a la Economía"], semestre: 8 },
  { nombre: "Electiva Técnica I", requisitos: ["Electiva de Contexto II"], semestre: 8 },
  { nombre: "Electrónica", requisitos: ["Hidráulica y Neumática"], semestre: 9 },
  { nombre: "Instrumentación Industrial", requisitos: ["Electrónica"], semestre: 9 },
  { nombre: "Diseño Aplicado", requisitos: ["Diseño Mecánico II"], semestre: 9 },
  { nombre: "Mantenimiento y Lubricación", requisitos: ["Máquinas Hidráulicas"], semestre: 9 },
  { nombre: "Motores Térmicos", requisitos: ["Transferencia de Calor"], semestre: 9 },
  { nombre: "Proyecto de Grado I", requisitos: ["Ingeniería Económica"], semestre: 9 },
  { nombre: "Electiva Técnica II", requisitos: ["Electiva Técnica I"], semestre: 9 },
  { nombre: "Formulación y Evaluación de Proyectos", requisitos: ["Electrónica"], semestre: 10 },
  { nombre: "Automatización y Control", requisitos: ["Instrumentación Industrial"], semestre: 10 },
  { nombre: "Plantas de Conversión de Energía", requisitos: ["Motores Térmicos"], semestre: 10 },
  { nombre: "Proyecto de Grado II", requisitos: ["Proyecto de Grado I"], semestre: 10 },
  { nombre: "Electiva no Técnica", requisitos: [], semestre: 10 }
];

const malla = document.getElementById("malla");
const template = document.getElementById("materia-template");
let estadoMaterias = JSON.parse(localStorage.getItem("estadoMaterias")) || {};

function renderizar() {
  malla.innerHTML = "";
  const porSemestre = {};
  materias.forEach(m => {
    porSemestre[m.semestre] ||= [];
    porSemestre[m.semestre].push(m);
  });

  Object.keys(porSemestre).sort((a,b)=>a-b).forEach(sem => {
    const columna = document.createElement("div");
    const titulo = document.createElement("h3");
    titulo.textContent = `Semestre ${sem}`;
    columna.appendChild(titulo);
    porSemestre[sem].forEach(materia => {
      const clon = template.content.cloneNode(true);
      const div = clon.querySelector(".materia");
      const span = clon.querySelector(".nombre");
      const tooltip = clon.querySelector(".tooltip");
      span.textContent = materia.nombre;
      
      const aprobada = estadoMaterias[materia.nombre];
      const requisitosCumplidos = materia.requisitos.every(req => estadoMaterias[req]);
      
      if (aprobada) {
        div.classList.add("aprobada");
      } else if (!requisitosCumplidos && materia.requisitos.length > 0) {
        div.classList.add("bloqueada");
        tooltip.textContent = `Requiere: ${materia.requisitos.join(", ")}`;
      }

      div.addEventListener("click", () => {
        if (div.classList.contains("bloqueada")) return;
        estadoMaterias[materia.nombre] = !estadoMaterias[materia.nombre];
        guardarEstado();
        renderizar();
      });

      columna.appendChild(clon);
    });
    malla.appendChild(columna);
  });
}

function guardarEstado() {
  localStorage.setItem("estadoMaterias", JSON.stringify(estadoMaterias));
}

document.getElementById("reiniciarBtn").addEventListener("click", () => {
  if (confirm("¿Estás seguro de reiniciar la malla?")) {
    localStorage.removeItem("estadoMaterias");
    estadoMaterias = {};
    renderizar();
  }
});

document.getElementById("modoToggle").addEventListener("click", () => {
  document.body.classList.toggle("modo-oscuro");
  localStorage.setItem("modoOscuro", document.body.classList.contains("modo-oscuro"));
});

// Mantener modo al recargar
if (localStorage.getItem("modoOscuro") === "true") {
  document.body.classList.add("modo-oscuro");
}

function actualizarProgreso() {
  const total = materias.length;
  const aprobadas = Object.keys(estadoMaterias).filter(nombre => estadoMaterias[nombre]).length;
  const porcentaje = Math.round((aprobadas / total) * 100);

  const barra = document.getElementById("progreso-barra");
  const texto = document.getElementById("progreso-texto");

  barra.style.width = `${porcentaje}%`;
  texto.textContent = `Progreso: ${porcentaje}%`;
}

renderizar();
actualizarProgreso();
