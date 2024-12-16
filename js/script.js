//BIENVENIDA
alert("Bienvenido a tu calculadora de gastos!");

//Ingreso de gastos:

let dineroDisponible=prompt("Cuanto dinero tiene disponible?");
let gastosIngresados= prompt("Cuantos gastos quiere ingresar?");
let montoGastos=prompt("Monto de los gastos:");

//Validación
if (isNaN(dineroDisponible)  || isNaN(montoGastos)) {
    alert("Por favor, ingresa valores numéricos válidos.");
} else {let totalGastos=0;}

let gastos=[];

// Procesamiento: Pedir cada gasto y categoría al usuario
  for (let i = 1; i <= gastosIngresados; i++) {
    let montoGastos = parseFloat(prompt(`Ingresa el monto del gasto ${i}:`));
    
// Validar el monto del gasto
    if (isNaN(montoGastos) || montoGastos < 0) {
        alert("Por favor, ingresa un monto válido para el gasto.");
        i--; // Repetir la iteración
        continue;
    }
    
    // Pedir la categoría del gasto
    let categoria = prompt(`¿Cuál es la categoría del gasto ${i}? (Ejemplo: Comida, Transporte, Entretenimiento)`);

    // Guardar el gasto y la categoría en el array
    gastos.push({ monto: montoGastos, categoria: categoria });
}



//Calculo de gastos:
let totalGastos=0;

for (let i = 1; i <= gastosIngresados; i++) {
    let gasto = parseFloat(prompt(`Ingresa el monto total de los gastos ${i}:`));
    totalGastos += gasto; }

    // Mostrar resumen en la consola
    console.log("Resumen de tus gastos:");
    gastos.forEach((gasto, index) => {
        console.log(`Gasto ${index + 1}: $${gasto.monto.toFixed(2)} en ${gasto.categoria}`);
    });

    let dineroRestante = dineroDisponible - totalGastos;

    // Mostrar resultado final
    console.log(`Total de gastos: $${totalGastos.toFixed(2)}`);
    console.log(`Dinero disponible: $${(dineroDisponible)}`);
    console.log(`Dinero restante: $${(dineroRestante)}`);


  console.log("Fin del calculo");