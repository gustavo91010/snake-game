const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");

/**
 * 
contexto.fillStyle= "red" // estilo do preenchimento da figura
contexto.fillRect(300, 300, 10, 10)// um retantugo nas cordenadas x e y com altura e comprimento de...
*/
const size = 30;
const snake = [
    { x: 0, y: 0 },

    /*
    { x: 200, y: 200 },
    { x: 230, y: 200 },
    { x: 260, y: 200 },

    A cobrinha será um array de posições, pois cada objeto tera a posição x e y*/
]

let direction = ""
let loopId

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
    moveSnake()
    drawSnake()

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

    
    
    if( key == "ArrowRight" && direction != "Left"){
       // direction= key.replace('Arrow',"")
       direction="Right"
        
    }
    if( key == "ArrowLeft" && direction != "Right"){
        direction="Left"

    }
    if( key == "ArrowUp" && direction != "Down"){
        direction="Up"
    }
    if( key == "ArrowDown" && direction != "Up"){
        direction="Down"
        
    }
    


  

})

gameloop()