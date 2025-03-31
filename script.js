const tablero = document.getElementById('tablero');
const vidasCount = document.getElementById('vidas-count');
const reiniciarBtn = document.getElementById('reiniciar');
let vidas = 3;
let reinas = 0;
const n = 8;
let tableroEstado = Array.from({ length: n }, () => Array(n).fill(0));

function crearTablero() {
    tablero.innerHTML = '';
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const celda = document.createElement('div');
            celda.classList.add('celda');
            celda.classList.add((i + j) % 2 === 0 ? 'blanca' : 'negra');
            celda.dataset.fila = i;
            celda.dataset.col = j;
            celda.addEventListener('click', manejarClick);
            tablero.appendChild(celda);
        }
    }
}

function manejarClick(event) {
    let target = event.target;

    // Si se hace clic en la reina, eliminamos la reina
    if (target.classList.contains('reina')) {
        let celda = target.parentElement;
        let fila = parseInt(celda.dataset.fila);
        let col = parseInt(celda.dataset.col);

        celda.innerHTML = '';
        tableroEstado[fila][col] = 0;
        reinas--;
        return;
    }

    const fila = parseInt(target.dataset.fila);
    const col = parseInt(target.dataset.col);

    // Si la celda ya tiene una reina, la eliminamos (ya cubierto en el bloque anterior)
    if (tableroEstado[fila][col] === 1) {
        return;
    }

    // Si la posición es segura, coloca una nueva reina
    if (esSeguro(fila, col)) {
        target.innerHTML = '<div class="reina"></div>';
        tableroEstado[fila][col] = 1;
        reinas++;

        if (reinas === 8) {
            setTimeout(() => {
                alert('¡Ganaste! Puedes reiniciar el juego para jugar de nuevo.');
            }, 100); // Retraso de 100ms para permitir que el DOM se actualice
            return;
        }
    } else {
        target.innerHTML = '<div class="error">X</div>';
        setTimeout(() => {
            target.innerHTML = '';
        }, 1000);
        vidas--;
        vidasCount.textContent = vidas;

        if (vidas === 0) {
            alert('¡Perdiste!');
            reiniciarJuego();
        }
    }
}

function esSeguro(fila, col) {
    for (let i = 0; i < n; i++) {
        if (tableroEstado[fila][i] === 1 || tableroEstado[i][col] === 1) {
            return false;
        }
    }

    for (let i = fila, j = col; i >= 0 && j >= 0; i--, j--) {
        if (tableroEstado[i][j] === 1) {
            return false;
        }
    }

    for (let i = fila, j = col; i >= 0 && j < n; i--, j++) {
        if (tableroEstado[i][j] === 1) {
            return false;
        }
    }

    for (let i = fila, j = col; i < n && j >= 0; i++, j--) {
        if (tableroEstado[i][j] === 1) {
            return false;
        }
    }

    for (let i = fila, j = col; i < n && j < n; i++, j++) {
        if (tableroEstado[i][j] === 1) {
            return false;
        }
    }

    return true;
}

function reiniciarJuego() {
    vidas = 3;
    reinas = 0;
    vidasCount.textContent = vidas;
    tableroEstado = Array.from({ length: n }, () => Array(n).fill(0));
    crearTablero();
}

reiniciarBtn.addEventListener('click', reiniciarJuego);

crearTablero();