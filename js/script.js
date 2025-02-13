document.addEventListener('DOMContentLoaded', () => {
  //VARIABLES
  const dineroDisponibleInput = document.getElementById('dineroDisponible');
  const botonDinero = document.getElementById('botonDinero');
  const salida = document.getElementById('salida');

  const categoriaSelect = document.getElementById('categoria');
  const salidaCategoria = document.getElementById('salidaCategoria');

  const montoInput = document.getElementById('monto');
  const botonMonto = document.getElementById('botonmonto');
  const salidaMonto = document.getElementById('salidaMonto');

  const egresosDiv = document.getElementById('egresos');

  let dineroDisponible = 0;
  let egresos = JSON.parse(localStorage.getItem('egresos')) || []; // Cargar egresos del localStorage

  // Visualización Dinero Disponible
  botonDinero.addEventListener('click', () => {
      dineroDisponible = parseFloat(dineroDisponibleInput.value) || 0;
      salida.textContent = `Dinero disponible: $${dineroDisponible.toFixed(2)}`;
  });

  // Visualización y registro de gastos
  botonMonto.addEventListener('click', () => {
      const categoria = categoriaSelect.value;
      const monto = parseFloat(montoInput.value) || 0;

      if (categoria === "0" || isNaN(monto) || monto <= 0) {
          Swal.fire({
              title: "Oops",
              text: "Ingresa una categoria y un monto",
              icon: "error"
          });
          return;
      }

      const nuevoGasto = {
          categoria,
          monto
      };
      egresos.push(nuevoGasto);

      egresosDiv.innerHTML = '';
      egresos.forEach(gasto => {
          const gastoDiv = document.createElement('div');
          gastoDiv.textContent = `${gasto.categoria}: $${gasto.monto.toFixed(2)}`;
          egresosDiv.appendChild(gastoDiv);
      });

      salidaMonto.textContent = `Monto ingresado: $${monto.toFixed(2)}`;
      montoInput.value = '';
      localStorage.setItem('egresos', JSON.stringify(egresos)); // Guardar egresos en localStorage
      actualizarGrafico();
  });

  // Visualización Categoria
  categoriaSelect.addEventListener('change', () => {
      salidaCategoria.textContent = `La categoria seleccionada es: ${categoriaSelect.value}`;
  });

localStorage.removeItem('egresos'); 



  // MODO OSCURO
  let toggle = document.getElementById("toggle");
  let label_toggle = document.getElementById("label_toggle");

  if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark");
      toggle.checked = true;
      label_toggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  toggle.addEventListener("change", (event) => {
      let checked = event.target.checked;
      document.body.classList.toggle("dark");

      if (checked) {
          label_toggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
          localStorage.setItem("darkMode", "enabled");
      } else {
          label_toggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
          localStorage.setItem("darkMode", "disabled");
      }
  });

  //ESTADISTICAS
  const ctx = document.getElementById('bar').getContext('2d');
  const labels = ['Comida', 'Alquiler', 'Expensas', 'Servicios', 'Streaming', 'Musica'];
  const data = [0, 0, 0, 0, 0, 0];

  const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'Gastos por categoria',
              data: data,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(189, 250, 56, 0.2)',
                  'rgba(255, 86, 241, 0.2)',
                  'rgba(235, 86, 255, 0.2)',
                  'rgba(86, 255, 125, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 86, 241, 1)',
                  'rgba(235, 86, 255, 1)',
                  'rgba(86, 255, 125, 1)' ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    
    window.actualizarGrafico = function () { 
        const egresos = JSON.parse(localStorage.getItem('egresos')) || []; 


        data.fill(0);

        egresos.forEach(gasto => {
            const index = labels.indexOf(gasto.categoria);
            if (index !== -1) {
                data[index] += gasto.monto; 
            }
        });

        myChart.data.datasets[0].data = data;
        myChart.update();
    };


    actualizarGrafico();
});
                  