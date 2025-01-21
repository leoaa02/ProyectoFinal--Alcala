const d= document;

//VARIABLES DINERO DISPONIBLE
let dineroDisponible= d.getElementById("dineroDisponible");
const botonDinero= d.getElementById("botonDinero");
const salida= d.getElementById("salida");


//VARIABLES MONTO GASTOS
let monto= d.getElementById("monto");
const botonMonto= d.getElementById("botonMonto");
const salidaMonto=d.getElementById("salidaMonto");
const categoria= d.getElementById("categoria");
const egresos= d.getElementById("egresos");
//Almacenamiento
let totalDinero= 0;
let listaGastos= [];

//Visualzacón Dinero Disponible
botonDinero.addEventListener("click",()=>{
   const dineroTotal= parseFloat(dineroDisponible.value);
   if (isNaN(dineroTotal) || dineroTotal <= 0) {
      salida.textContent = "Por favor, introduce un valor válido mayor a 0.";
   return;}
// Actualizar dinero disponible(operación)
  totalDinero = dineroTotal;


      salida.textContent = `Dinero disponible: $${totalDinero.toFixed(2)}`;
      dineroDisponible.value = "";  });


//Visualización Monto Gastos
botonMonto.addEventListener("click",()=>{
   const montoGasto= parseFloat(monto.value);
   const categoriaSeleccionada= categoria.value;

// Validar los gastos
if (isNaN(montoGasto) || montoGasto <= 0) {
   alert("Introduce un monto válido.");
   return;
 }

 

 if (categoriaSeleccionada === "0") {
   alert("Selecciona una categoría válida.");
   return;} 

 if (montoGasto > totalDinero) {
   alert("No tienes suficiente dinero disponible.");
   return;}  

   //Restar el gasto del dinero disponible
   totalDinero - montoGasto;
 // Guardar el gasto en la lista
 listaGastos.push({ categoria: categoriaSeleccionada, monto: montoGasto });

   //Mostrar el gasto en la sección de egresos
  const nuevoGasto= d.createElement("p");
  nuevoGasto.textContent= `${categoriaSeleccionada}: $${montoGasto.toFixed(2)}`;
   egresos.appendChild(nuevoGasto);

    // Actualizar el dinero disponible
    salida.textContent = `Dinero disponible: $${totalDinero.toFixed(2)}`;
      // Limpiar los campos
  monto.value = "";
  categoria.value = "0"; });
