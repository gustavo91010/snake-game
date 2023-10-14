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

## Melhorias Futuras

-O uso das teclas para movimentação
- Adicionarei pontuação e um sistema de níveis.
- Aprimore a interface do usuário com cores e estilos.
- Implemente funcionalidades adicionais, como power-ups, obstáculos, etc.


