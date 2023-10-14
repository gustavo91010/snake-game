const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");

/**
 * 
contexto.fillStyle= "red" // estilo do preenchimento da figura
contexto.fillRect(300, 300, 10, 10)// um retantugo nas cordenadas x e y com altura e comprimento de...
*/
const size = 30;
const snake = [
    { x: 200, y: 200 },
    { x: 230, y: 200 },
    { x: 260, y: 200 },

    /*
    A cobrinha será um array de posições, pois cada objeto tera a posição x e y*/
]

let direction = ""


const drawSnake = () => {
    contexto.fillStyle = "#ddd";
    // contexto.fillRect(snake[0].x, snake[0].y, size, size)
    snake.forEach((position, index) => {

        if (index == snake.length - 1) {
            // Captura o index, se for o ultimo, a cabeça, mudar ela de cor
            // contexto.fillStyle = "white";
            contexto.fillStyle = "blue";


        }
        contexto.fillRect(position.x, position.y, size, size)
    })
}

const moveSnake = () => {
    const head = snake[snake.length - 1];

    switch (direction) {
        case "right":
            snake.push({
                x: (head.x + size),
                y: (head.y)
            })
            break;
        case"left":
        snake.push({
            x: (head.x - size),
            y: (head.y)
        })
        break;
    case "down":
        snake.push({
            x: (head.x),
            y: (head.y + size)
        })
        break;
    case "up":
        snake.push({
            x: (head.x),
            y: (head.y - size)
        })
        break
    default: return
    }
    /** 
     * 
     * 
     *  if (!direction) return // se não tiver nenhum valor em direction, ela nao execute essa função...

    if (direction == "right") { // se a direção for para a direita...
        snake.push({
            x: (head.x + size),
            y: (head.y)
        })
    }
    if (direction == "left") { // se a direção for para a direita...
        snake.push({
            x: (head.x - size),
            y: (head.y)
        })
    }
    if (direction == "down") { // se a direção for para a direita...
        snake.push({
            x: (head.x),
            y: (head.y + size)
        })
    }
    if (direction == "up") { // se a direção for para a direita...
        snake.push({
            x: (head.x),
            y: (head.y - size)
        })
    }
    */

    snake.shift() // remove o primeiro elemento do array, no nosso caso, o ultimo bloco da cobrinha
}

//setInterval é usada para repetir a execução de um bloco de código a cada intervalo de tempo especificado.

setInterval(() => {
    contexto.clearRect(0, 0, 600, 600) // estou limpando o canvas por completo
    moveSnake()
    drawSnake()

}, 1000)
