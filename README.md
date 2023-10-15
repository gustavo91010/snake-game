# Jogo da Cobrinha (Snake Game)

## Sobre o Projeto

Este projeto é uma implementação clássica do jogo da cobrinha, construído com tecnologias web - HTML, CSS e JavaScript. O jogo faz uso da tag `canvas` para criar o tabuleiro e renderizar os elementos do jogo, proporcionando uma experiência interativa.

A cobra no jogo é representada como um array de posições (coordenadas `x` e `y`). A mecânica do jogo envolve movimentar a cobra, que é feita removendo o primeiro elemento do array (que corresponde à cauda da cobra) e adicionando um novo elemento ao final do array, com coordenadas ajustadas para a nova direção. Isso cria a ilusão de movimento contínuo da cobra.

A cada passo do jogo, o tabuleiro é limpo usando o método `clearRect` do objeto `canvas`, garantindo que o jogo seja renderizado sem artefatos e dando a impressão de deslocamento da cobra.

## Como Jogar

1. Abra o arquivo HTML no seu navegador.
2. Use as teclas direcionais (setas) para controlar a direção da cobra: ↑ (cima), ↓ (baixo), ← (esquerda), → (direita). 
3. O objetivo do jogo é comer a comida para crescer a cobra.
4. Evite colidir com as bordas do tabuleiro ou com o próprio corpo da cobra.

## Lógica do Jogo em JavaScript

O funcionamento do jogo da cobrinha é baseado em uma série de lógicas e algoritmos em JavaScript. Aqui estão algumas das principais lógicas utilizadas:

- **Movimentação da Cobra:** A cobra é representada como um array de posições (coordenadas x e y). A lógica de movimentação envolve a remoção do primeiro elemento do array (a cauda da cobra) e a adição de um novo elemento no final do array, com coordenadas ajustadas para a nova direção. Isso cria a ilusão de movimento contínuo da cobra.

- **Comer a Comida:** O objetivo do jogo é fazer com que a cobra "coma" a comida para crescer. A lógica verifica se a posição da cabeça da cobra é igual à posição da comida, e, em caso positivo, a cobra cresce, a pontuação aumenta e uma nova comida é gerada aleatoriamente.

- **Colisões:** O jogo verifica constantemente se a cobra colidiu com as bordas do tabuleiro ou consigo mesma. Se uma colisão for detectada, o jogo termina, e a tela de "Game Over" é exibida.

- **Níveis de Dificuldade:** O jogo possui um sistema de níveis de dificuldade. Conforme o jogador progride, a velocidade do jogo aumenta, tornando-o mais desafiador.

- **Interface do Usuário:** A interface do usuário é cuidadosamente projetada em CSS, com elementos para exibir a pontuação, o estado do jogo e a opção de jogar novamente.

Essas são apenas algumas das lógicas implementadas para criar a experiência de jogo divertida e envolvente do Jogo da Cobrinha. O código JavaScript é organizado de forma a manter o jogo funcionando suavemente e proporcionando uma experiência de usuário agradável.

## Tags Utilizadas no CSS

O estilo do jogo da cobrinha (Snake Game) é definido por meio de folhas de estilo CSS. Abaixo estão algumas das tags principais usadas no arquivo CSS:

- `*`: utilizei ela para definir margens, preenchimentos e a fonte padrão para todos os elementos.

- `body`: Usei ela para definir o fundo, o layout flex, a cor do texto e outras propriedades relacionadas ao corpo da página.

- `canvas`: Usei ela para estilizar o elemento onde o jogo é renderizado.Definindo tambem o fundo e o tamanho do canvas.

- Classes CSS (por exemplo, `.score`, `.score__value`, `.menu__screen`, `.menu__screen__game_over`, `.menu__screen__final_score`, `.menu__screen__jogar_novamente`): Classes CSS são usadas para estilizar elementos específicos em seu HTML. Essas classes são aplicadas a elementos HTML relevantes, como a pontuação, a tela de menu, os botões e muito mais. Cada classe tem seu conjunto de estilos associados para controlar a aparência desses elementos.

Além disso, utilizei propriedades como `display`, `flex-direction`, `font-size`, `color`, `background-color`, `font-weight`, `padding`, `margin`, `border-radius`, `text-transform`, `cursor`, entre outras, para personalizar o estilo do seu jogo.

Essas são algumas das tags e propriedades CSS que utilizei para criar o estilo visual do jogo da cobrinha. A personalização dessas tags é crucial para a aparência e a experiência do usuário no jogo.


