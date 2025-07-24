document.addEventListener('DOMContentLoaded', () => {
  const materias = {
    // Semestre 1
    "Cálculo Diferencial": [],
    "Álgebra Lineal": [],
    "Física Mecánica": [],
    "Química General": [],
    "Introducción a la Ingeniería": [],
    "Comunicación Oral y Escrita": [],

    // Semestre 2
    "Cálculo Integral": ["Cálculo Diferencial"],
    "Álgebra y Trigonometría": ["Álgebra Lineal"],
    "Física Eléctrica": ["Física Mecánica"],
    "Química Aplicada": ["Química General"],
    "Dibujo de Ingeniería": [],
    "Pensamiento Sistémico": [],

    // Semestre 3
    "Cálculo Multivariable": ["Cálculo Integral"],
    "Ecuaciones Diferenciales": ["Cálculo Integral"],
    "Mecánica": ["Física Mecánica"],
    "Estática": ["Álgebra y Trigonometría"],
    "Programación": [],
    "Probabilidad y Estadística": [],

    // Semestre 4
    "Dinámica": ["Estática"],
    "Resistencia de Materiales": ["Estática"],
    "Termodinámica": ["Cálculo Multivariable", "Física Mecánica"],
    "Electrónica": ["Física Eléctrica"],
    "Métodos Numéricos": ["Ecuaciones Diferenciales"],
    "Modelado y Simulación": ["Programación"],

    // Semestre 5
    "Análisis de Circuitos": ["Electrónica"],
    "Mecanismos": ["Dinámica"],
    "Transferencia de Calor": ["Termodinámica"],
    "Materiales de Ingeniería": ["Resistencia de Materiales"],
    "Ingeniería Económica": [],
    "Instrumentación": ["Electrónica"],

    // Semestre 6
    "Máquinas Térmicas": ["Transferencia de Calor"],
    "Control Automático": ["Análisis de Circuitos"],
    "Diseño Mecánico": ["Materiales de Ingeniería", "Mecanismos"],
    "Procesos de Manufactura": ["Materiales de Ingeniería"],
    "Legislación": [],
    "Electiva I": [],

    // Semestre 7
    "Máquinas Hidráulicas": ["Máquinas Térmicas"],
    "Control de Procesos": ["Control Automático"],
    "Diseño Asistido por Computador": ["Diseño Mecánico"],
    "Automatización Industrial": ["Instrumentación"],
    "Proyectos de Ingeniería I": ["Ingeniería Económica"],
    "Electiva II": [],

    // Semestre 8
    "Simulación de Sistemas": ["Modelado y Simulación"],
    "Proyecto de Grado": ["Proyectos de Ingeniería I"],
    "Electiva III": [],
    "Electiva IV": []
  };

  const materiasDOM = document.querySelectorAll('.materia');

  function actualizarEstado() {
    materiasDOM.forEach(m => {
      const nombre = m.textContent.trim();
      const requisitos = materias[nombre];
      if (!m.classList.contains('aprobada')) {
        const cumplidos = requisitos.every(req => {
          return [...materiasDOM].find(el => el.textContent.trim() === req)?.classList.contains('aprobada');
        });

        if (cumplidos) {
          m.classList.remove('bloqueada');
          m.querySelector('.tooltip')?.remove();
        } else {
          m.classList.add('bloqueada');
          if (!m.querySelector('.tooltip')) {
            const tooltip = document.createElement('span');
            tooltip.classList.add('tooltip');
            tooltip.textContent = `Requiere: ${requisitos.join(', ')}`;
            m.appendChild(tooltip);
          }
        }
      }
    });
  }

  materiasDOM.forEach(m => {
    m.addEventListener('click', () => {
      if (m.classList.contains('bloqueada')) return;

      m.classList.toggle('aprobada');
      actualizarEstado();
    });
  });

  actualizarEstado();
});
