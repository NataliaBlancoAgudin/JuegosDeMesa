// Datos de la partida
const jugadores = [];

// Seleccion de elementos
const formulario = document.querySelector("form");
const inputNombre = document.querySelector("input[name='nombre']");
const listaJugadores = document.querySelector("ul");
const botonesCartas = document.querySelectorAll("main section:last-of-type button");

// Funcion para actualizar la lista de jugadores en pantalla
function mostrarJugadores() {
    listaJugadores.innerHTML = "";
    jugadores.forEach((jugador, index) => {
        const elemento = document.createElement("li");
        elemento.textContent = `${jugador.nombre} - Dinero: ${jugador.dinero}€`;

        // Botones para seleccionar a quien aplicar la carta
        const botonSeleccion = document.createElement("button");
        botonSeleccion.textContent = "Seleccionar";
        botonSeleccion.addEventListener("click", () =>{
            jugador.seleccionado = !jugador.seleccionado;
            botonSeleccion.style.background = jugador.seleccionado ? "#2196F3" : "#4caf50";

        });

        elemento.appendChild(botonSeleccion);
        listaJugadores.append(elemento);
    });
}

// Evento para añadir jugadores
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nombre = inputNombre.value.trim();
    if(nombre) {
        jugadores.push({ nombre: nombre, dinero: 1400, seleccionado: false});
        inputNombre.value = "";
        mostrarJugadores();
    }
});

// Evento para aplicar cartas
botonesCartas.forEach(boton => {
    boton.addEventListener("click", () => {
        const precio = parseInt(boton.getAttribute("data-precio"), 10);
        console.log("Se ha hecho click en un boton " );

        jugadores.forEach(jugador => {
            if(jugador.seleccionado){
                jugador.dinero -= precio;
                jugador.seleccionado = false; // Quitar de seleccinado
                if(jugador.dinero < 0) jugador.dinero = 0;
            }
        });

        mostrarJugadores();
    });
});