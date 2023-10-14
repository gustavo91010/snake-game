const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");

/**
 * 
contexto.fillStyle= "red" // estilo do preenchimento da figura
contexto.fillRect(300, 300, 10, 10)// um retantugo nas cordenadas x e y com altura e comprimento de...
*/
let direction = ""
let loopId

const audio= new Audio('../assets/audio.mp3')
const size = 30;
const snake = [
    { x: 0, y: 0 },

    /*
    { x: 200, y: 200 },
    { x: 230, y: 200 },
    { x: 260, y: 200 },

    A cobrinha será um array de posições, pois cada objeto tera a posição x e y*/
]

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min)
    // o round so pega a parte inteira do mumeto, nesse caso, estou pegando os inteiros gerados pelo random dentro do limite estabelecido
}
const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size);
    // Transformando o numero aleatorio em multiplos de 30
    return Math.round(number / 30) * 30

}
const randomColor = () => {
    const red = randomNumber(0, 255)
    const blue = randomNumber(0, 255)
    const green = randomNumber(0, 255)

    return `rgb(${red}, ${green},${blue})`
}
let colorAtual = randomColor()


const food = {
    x: randomPosition(),
    y: randomPosition(),
    color: colorAtual
}



const chackEat = () => {
    // Se a posição da cabeça for igual ao da comida, quer dizer que a cobra comeu a comida
    const head = snake[snake.length - 1];
    if (head.x == food.x && head.y == food.y) {

        snake.push(head)
        audio.play()

        // Gerando uma nova comida:
        colorAtual = randomColor()
        

        // Verificando se a comida vai ser gerada em alguma posição ja ocupada pela cobra:
        let x = randomPosition();
        let y = randomPosition();

        // esse find, ta mais para um filter, ele ta pegando todas as posições da cobrinha e verificando
        // se tem alguem com a posição x e y iguais a que acabei de gerar, se sim, manda um true e entra no while...
        // se achar, ele gera novamente o y e x
        while (snake.find((position) =>position.x == x && position.y == y)){
             x = randomPosition();
             y = randomPosition();
        }
        food.x= x;
        food.y = y;
        food.color = colorAtual

    }
}


const drawSnake = () => {
    contexto.fillStyle = "#ddd";
    // contexto.fillRect(snake[0].x, snake[0].y, size, size)
    snake.forEach((position, index) => {

        if (index == snake.length - 1) {
            // Captura o index, se for o ultimo, a cabeça, mudar ela de cor
            // contexto.fillStyle = "white";
            contexto.fillStyle = colorAtual;


        }
        contexto.fillRect(position.x, position.y, size, size)
    })
}
const drawGrid = () => {
    // Prepara a linha
    contexto.lineWidth = 1;
    contexto.strokeStyle = "#191919"

    // Define posiççao:
    //contexto.lineTo(60,0)
    //contexto.lineTo(60,600)


    for (let i = 30; i < canvas.width; i += 30) {
        // Vertical:
        contexto.beginPath() // Sempre iciciaondo a escrita do mesmo ponto

        contexto.lineTo(i, 0)
        contexto.lineTo(i, 600)

        // Escreve:
        contexto.stroke()

        // Horizontal:

        contexto.beginPath()
        contexto.lineTo(0, i)
        contexto.lineTo(600, i)
        contexto.stroke()
    }



}

const drawFood = () => {
    const { x, y, color } = food

    contexto.shadowColor = color;
    contexto.shadowBlur = 20; // Criar um efeito borrado , que deveria ser sómente na comida

    contexto.fillStyle = color;
    contexto.fillRect(x, y, size, size)

    contexto.shadowBlur = 0; // Depois que eu criar o efeito na comida, eu retiro o efeito para qu eele não se extenda por tdo o tabuleiro
}


const moveSnake = () => {
    const head = snake[snake.length - 1];

    switch (direction) {
        case "Right":
            snake.push({
                x: (head.x + size),
                y: (head.y)
            })
            break;
        case "Left":
            snake.push({
                x: (head.x - size),
                y: (head.y)
            })
            break;
        case "Down":
            snake.push({
                x: (head.x),
                y: (head.y + size)
            })
            break;
        case "Up":
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

/**  Responsavel de fazer o jogo funcionar em loop
 *  gameloop():
 * ele limpa a tela, faz o move, faz o draw e depois de 3s refaz o processo
 */

const gameloop = () => {
    clearInterval(loopId) // limpa pelo id o as threads de timeout que possam ainda esta em uso para que possa chamar uma outra
    contexto.clearRect(0, 0, 600, 600)
    drawGrid();
    drawFood();
    moveSnake();
    drawSnake();
    chackEat();

    loopId = setTimeout(() => {
        gameloop()
    }, 300)
    // setTimeout: determina o que ele faz e o intervalo de tempo

}
/** 
 * 
//setInterval é usada para repetir a execução de um bloco de código a cada intervalo de tempo especificado.

setInterval(() => {
    contexto.clearRect(0, 0, 600, 600) // estou limpando o canvas por completo
    moveSnake()
    drawSnake()
    
}, 1000)
*/



/** ############################ interação com as teclas:
 * document.addEventListener("keydown", (event)=>{
    console.log(event.key)
    ArrowUp, ArrowDown, ArrowRight, ArrowLeft
*/


document.addEventListener("keydown", ({ key }) => {
    //console.log(key.replace('Arrow',""))



    if (key == "ArrowRight" && direction != "Left") {
        // direction= key.replace('Arrow',"")
        direction = "Right"

    }
    if (key == "ArrowLeft" && direction != "Right") {
        direction = "Left"

    }
    if (key == "ArrowUp" && direction != "Down") {
        direction = "Up"
    }
    if (key == "ArrowDown" && direction != "Up") {
        direction = "Down"

    }





})

// 

// Start Game!

gameloop()