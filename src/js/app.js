let palabras = [];
let palabrasSacadas = [];

function actualizarContador() {
    let contadorPalabras = document.getElementById('contadorPalabras');
    contadorPalabras.textContent = palabras.length ===0? "olla vacia!🍲" :palabras.length + ' papeles en la olla🍲';
}

function actualizarLista() {
    let palabrasLista = document.getElementById('palabrasLista');
    palabrasLista.innerHTML = '';

    palabras.forEach(palabra => {
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = palabra;
        if (palabrasSacadas.includes(palabra)) {
            li.className += ' censurado';
        }
        palabrasLista.appendChild(li);
    });

    actualizarContador();
}

function agregarPalabra() {
    let nuevaPalabra = prompt('Ingrese tu papel:');
    if (nuevaPalabra !== null && nuevaPalabra.trim() !== '') {
        palabras.push(nuevaPalabra.trim());
        actualizarLista();
    }
}

function sacarPalabra() {
    if (palabras.length === 0) {
        alert('La bolsa de papeles está vacía.');
        return;
    }
    let indiceAleatorio = Math.floor(Math.random() * palabras.length);
    let palabraSacada = palabras.splice(indiceAleatorio, 1)[0];
    palabrasSacadas.push(palabraSacada);
    actualizarLista();
    mostrarPalabraSacada(palabraSacada);
    actualizarPalabrasSacadas();
    if (palabras.length === 0 && palabrasSacadas.length > 0) {
        document.getElementById('revolverBolsaBtn').disabled = false;
    }
}

function mostrarPalabraSacada(palabra) {
    let ultimaPalabraGuardada = document.getElementById('ultimaPalabraGuardada');
    ultimaPalabraGuardada.textContent = palabra;
}

function actualizarPalabrasSacadas() {
    let palabrasSacadasLista = document.getElementById('palabrasSacadasLista');
    palabrasSacadasLista.innerHTML = '';

    palabrasSacadas.forEach(palabra => {
        let li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = palabra;
        palabrasSacadasLista.appendChild(li);
    });

    // Actualizar contador de palabras sacadas
    let contadorPalabrasSacadas = document.getElementById('contadorPalabrasSacadas');
    contadorPalabrasSacadas.textContent = palabrasSacadas.length + ' papeles sacados';
}

function eliminarTodasLasPalabras() {
    if (palabras.length === 0) {
        alert('No hay papeles que eliminar.');
        return;
    }
    let confirmacion = confirm('¿Está seguro que desea eliminar todos los papeles?');
    if (confirmacion) {
        palabras = [];
        actualizarLista();
    }
}

function guardarUltimaPalabra() {
    if (palabrasSacadas.length === 0) {
        alert('No hay papeles sacados para guardar.');
        return;
    }
    let ultimaPalabra = palabrasSacadas.pop();
    palabras.push(ultimaPalabra);
    actualizarLista();
    actualizarPalabrasSacadas();
    mostrarPalabraSacada('');
}

function revolverBolsa() {
    if (palabrasSacadas.length === 0) {
        alert('No hay papeles sacados para revolver la bolsa.');
        return;
    }
    palabras = palabras.concat(palabrasSacadas);
    palabrasSacadas = [];
    actualizarLista();
    actualizarPalabrasSacadas();
    mostrarPalabraSacada('');
    
    let revolverBolsaBtn = document.getElementById('revolverBolsaBtn');
    revolverBolsaBtn.disabled = true;

    if (palabras.length === 0 && palabrasSacadas.length > 0) {
        revolverBolsaBtn.disabled = false;
    }
}



// Inicializar la lista al cargar la página
actualizarLista();
actualizarPalabrasSacadas();



// PREVENSION DE RECARGA
window.addEventListener('beforeunload', function (event) {
    // Solo mostrar la advertencia si hay palabras en las listas
    if (palabras.length > 0 || palabrasSacadas.length > 0) {
        // Cancelar el evento de cierre para mostrar el mensaje de confirmación
        event.preventDefault();
        // Mensaje que se mostrará al usuario
        event.returnValue = '¿Estás seguro de que deseas abandonar la página? ' +
                            'Podrías perder las palabras que has ingresado.';
    }
});