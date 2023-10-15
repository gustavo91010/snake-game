const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d");
const initialPosition= { x: 300, y: 300 }

const scoreValue= document.querySelector('.score__value')
const score= document.querySelector('.score')

const finalScoreValue= document.querySelector('.menu__screen__final_score > span')
const menu= document.querySelector('.menu__screen')
const buttonPlay= document.querySelector('.menu__screen__jogar_novamente')
/**
 * 
contexto.fillStyle= "red" // estilo do preenchimento da figura
contexto.fillRect(300, 300, 10, 10)// um retantugo nas cordenadas x e y com altura e comprimento de...
*/
let endGame= false;
let direction = ""
let loopId
let time=300

// Score:
const incrementScore= ()=>{
    scoreValue.innerText= Number(scoreValue.innerText) + 10
}

const audio = new Audio('../assets/audio.mp3')
const size = 30;
let snake = [
    initialPosition,
    /*
    { x: 0, y: 30 },
    { x: 0, y: 60 },
    { x: 0, y: 90 },
    { x: 0, y: 120 },
    { x: 0, y: 150 },
    { x: 0, y: 180 },

  

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

 const aumentoDificuldade= ()=>{
    if(time > 200){
        time= time -5
    }
    if(time< 120){
        time= time -3

    }
    if(time< 100 && time > 50){
        time= time -1

    }
 }
// Responsavel por comer as frutunhas
const chackEat = () => {
    // Se a posição da cabeça for igual ao da comida, quer dizer que a cobra comeu a comida
    const head = snake[snake.length - 1];
    if (head.x == food.x && head.y == food.y) {

        snake.push(head)
        audio.play()
        incrementScore()
        aumentoDificuldade()
      //  time= time-10

        // Gerando uma nova comida:
        colorAtual = randomColor()


        // Verificando se a comida vai ser gerada em alguma posição ja ocupada pela cobra:
        let x = randomPosition();
        let y = randomPosition();

        // esse find, ta mais para um filter, ele ta pegando todas as posições da cobrinha e verificando
        // se tem alguem com a posição x e y iguais a que acabei de gerar, se sim, manda um true e entra no while...
        // se achar, ele gera novamente o y e x
        while (snake.find((position) => position.x == x && position.y == y)) {
            x = randomPosition();
            y = randomPosition();
        }
        food.x = x;
        food.y = y;
        food.color = colorAtual

    }
}


const gameOver=()=>{
    endGame= true
    direction= undefined
    menu.style.display= "flex"
    scoreValue.style.display= "none"
    score.style.display= "none"

    finalScoreValue.innerText= scoreValue.innerText

    canvas.style.filter= "blur(2px)" // deixar o elemento disfocado quando perder... adicionar o z-index no elemento que deveria continuar aparecebdo, no caos, no menu
    snake=[initialPosition ]
  
   time= 300
}
// Responsavel por verificar as colisões
const checkCollision = () => {

    const canvasLimit = canvas.width - size;
    const head = snake[snake.length - 1];
    const pescoco = snake.length-2;

    const wallCollision = head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit
    
    const selfCollision= snake.find((position, index)=>{
        // se  posição da cobra for alguma posição contendo abaixo da cabeça, deve dar erro.
        return index< pescoco && position.x== head.x && position.y == head.y
    })

    if (wallCollision || selfCollision) {
        //alert("Você perdeu")
        gameOver()
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
    checkCollision()

    loopId = setTimeout(() => {
        gameloop()
    }, time)
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

if(!endGame){

    
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

    }




})
buttonPlay.addEventListener("click", ()=>{
    endGame= false
    menu.style.display= "none"
    
    
    scoreValue.style.display= "flex"
    score.style.display= "flex"
    canvas.style.filter= "none" 
    scoreValue.innerText= "00";
    
})

// 

// Start Game!

gameloop()