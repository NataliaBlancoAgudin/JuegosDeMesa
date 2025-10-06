// -----------------------------
// Datos de la partida
// -----------------------------
const jugadores = [];

// -----------------------------
// Selección de elementos
// -----------------------------
const formulario = document.querySelector("form");
const inputNombre = document.querySelector("input[name='nombre']");
const listaJugadores = document.querySelector("tbody");

// Calculadora
const outputCalc = document.querySelector("main section:nth-of-type(2) output");
const botonesCalc = document.querySelectorAll("main section:nth-of-type(2) button");

// -----------------------------
// Mostrar jugadores en tabla
// -----------------------------
function mostrarJugadores() {
    listaJugadores.innerHTML = "";
    jugadores.forEach((jugador, index) => {
        const fila = document.createElement("tr");

        // Columna: nombre
        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = jugador.nombre;

        // Columna dinero
        const celdaDinero = document.createElement("td");
        celdaDinero.textContent = `${jugador.dinero}€`;

        // Columna: acción (botón)
        const celdaAccion = document.createElement("td");
        const botonSeleccion = document.createElement("button");
        botonSeleccion.textContent = jugador.seleccionado ? "Seleccionado" : "Seleccionar";
        botonSeleccion.addEventListener("click", () => {
            jugador.seleccionado = !jugador.seleccionado;
            mostrarJugadores();
        });
        celdaAccion.appendChild(botonSeleccion);

        // Colores según estado
        if(jugador.dinero === 0){
            fila.style.color = "red";
            fila.style.opacity = "0.6";
        } else if(jugador.seleccionado){
            fila.style.background = "lightblue";
        }

        fila.append(celdaNombre, celdaDinero, celdaAccion);
        listaJugadores.appendChild(fila);
    });

    guardarPartida(); // Guardamos cada vez que se actualiza la lista
}

// -----------------------------
// Guardar / Cargar partida
// -----------------------------
function guardarPartida() {
    localStorage.setItem("jugadores", JSON.stringify(jugadores));
}

// Funcion para cargar partida al inciar la página
function cargarPartida() {
    const datos = localStorage.getItem("jugadores");
    if(datos) {
        const jugadoresGuardados = JSON.parse(datos);
        jugadores.length = 0;
        jugadores.push(...jugadoresGuardados);
        mostrarJugadores();
    }
}

// Cargar partida al iniar
cargarPartida();

// -----------------------------
// Añadir jugador
// -----------------------------
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nombre = inputNombre.value.trim();
    if(nombre) {
        jugadores.push({ nombre: nombre, dinero: 1400, seleccionado: false});
        inputNombre.value = "";
        mostrarJugadores();
    }
});

// -----------------------------
// Lógica de calculadora
// -----------------------------
let expresion = "";

botonesCalc.forEach(boton => {
    boton.addEventListener("click", () => {
        const valor = boton.textContent;

        if (valor === "C") {
            expresion = "";
            outputCalc.value = "0";
        } else if (valor === "=") {
            try {
                const resultado = eval(expresion);
                outputCalc.value = resultado;

                // Aplicar al jugador seleccionado
                jugadores.forEach(jugador => {
                    if (jugador.seleccionado) {
                        jugador.dinero += resultado;
                        if (jugador.dinero < 0) jugador.dinero = 0;
                        jugador.seleccionado = false;
                    }
                });

                mostrarJugadores();
                expresion = "";
            } catch {
                outputCalc.value = "Error";
                expresion = "";
            }
        } else {
            expresion += valor;
            outputCalc.value = expresion;
        }
    });
});