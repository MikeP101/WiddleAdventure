
function rectangularCollision({rectangle1, rectangle2}){
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

function checkCharacterCollision({characters, player, characterOffset = {x: 0, y: 0}}){
    player.interactionAsset = null    
    //monitor for character collission
        for (let i = 0; i < characters.length; i++){
            const character = characters[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...character, 
                    position: {
                    x: character.position.x + characterOffset.x,
                    y: character.position.y + characterOffset.y
                }}
            })){
                player.interactionAsset = character //activates npc dialogue
                break
            }
        }
}

// Función para formatear segundos a Hora:Minuto:Segundo
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

//Contador de tiempo
document.addEventListener('DOMContentLoaded', () => {
    let counter = 0;
    const counterElement = document.getElementById('counter');

    // Verificar si estamos en contador.html
    if (window.location.pathname.endsWith('index.html')) {
        // Incrementar el contador cada segundo
        const intervalId = setInterval(() => {
            counter++;
            if (counterElement) {
                counterElement.textContent = counter;
            }
        }, 1000);

        // Guardar el tiempo pasado y reiniciar el contador cuando la página se cierre
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('counter_result', counter);
            clearInterval(intervalId); // Detener el intervalo
            localStorage.setItem('counter', 0); // Resetear el contador
        });
    }

    // Verificar si estamos en resultado.html
    if (window.location.pathname.endsWith('resultado.html')) {
        // Recuperar y mostrar el tiempo pasado de localStorage
        const storedCounterResult = localStorage.getItem('counter_result');
        if (storedCounterResult && counterElement) {
            const formattedTime = formatTime(parseInt(storedCounterResult, 10));
            counterElement.textContent = formattedTime;
        }
    }
});
