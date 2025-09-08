 const emojis = ["🐶", "🐱", "🐰", "🦊", "🐸", "🐵", "🦁", "🐼"];
    let cartas = [];
    let primeira = null;
    let segunda = null;
    let bloqueado = false;
    let movimentos = 0;

    function embaralhar(array) {
      //array.sort((a, b) => a - b); // ordena em ordem crescente
      //- Math.random() gera um número entre 0 e 1.
      //- Subtrair 0.5 faz com que o resultado fique entre -0.5 e +0.5
      //- O .sort() usa esse valor para decidir se um item deve vir antes ou depois de outro.
      //- Como o valor é aleatório, a ordem dos elementos muda de forma imprevisível — ou seja, embaralha!
      return array.sort(() => 0.5 - Math.random());
      console.log(array)

    }

    function criarCarta(emoji) {
      const carta = document.createElement("div");
      carta.classList.add("carta");
      carta.textContent = "❓";
      carta.valor = emoji;
      carta.addEventListener("click", () => virarCarta(carta));
      return carta;
    }

    function virarCarta(carta) {
      //1. Verifica se o jogo está bloqueado ou se a carta já está virada.
      if (bloqueado || carta.classList.contains("virada")) return;
      // 2. Vira a carta clicada.
      carta.textContent = carta.valor;// Mostra o emoji da carta.
      carta.classList.add("virada"); // Adiciona a classe "virada" para estilização.
      // 3. Gerencia o estado das cartas selecionadas.
      if (!primeira) {
        // Se nenhuma carta foi selecionada ainda, esta é a primeira.
        primeira = carta;
      } else {
       // Se já existe uma carta selecionada, esta é a segunda.
        segunda = carta;
        bloqueado = true; // Bloqueia o jogo temporariamente para evitar cliques rápidos.
        movimentos++; // Incrementa o contador de movimentos
        document.getElementById("movimentos").textContent = movimentos; // Atualiza o placar na tela.
       // Verifica se as duas cartas formam um par.
        setTimeout(() => {
          // Se os valores (emojis) das cartas forem diferentes:
          if (primeira.valor !== segunda.valor) {
            primeira.textContent = "❓"; // Volta a mostrar o ponto de interrogação.
            segunda.textContent = "❓"; // Volta a mostrar o ponto de interrogação.
            primeira.classList.remove("virada"); // Remove a classe "virada".
            segunda.classList.remove("virada"); // Remove a classe "virada".
          }
          // Reseta as variáveis para o próximo par de cartas.
          primeira = null;
          segunda = null;
          bloqueado = false; // Desbloqueia o jogo.
          checarVitoria(); // Chama a função para verificar se o jogo terminou.
        }, 800); // Espera 800 milissegundos (0.8 segundos) antes de virar as cartas de volta ou continuar.
      }
    }

    function checarVitoria() {
       // Seleciona todos os elementos HTML que possuem a classe "virada".
      const viradas = document.querySelectorAll(".virada");
       // Se o número de cartas viradas for igual ao número total de cartas no jogo (guardado no array 'cartas').
      if (viradas.length === cartas.length) {
        // O jogador venceu!
    // Atualiza o texto de um elemento HTML com o ID "mensagem" para mostrar a mensagem de parabéns, incluindo o número de movimentos.
        document.getElementById("mensagem").textContent = `Parabéns! Você venceu com ${movimentos} movimentos!`;
      }
    }

    function iniciarJogo() {
      // Pega o elemento do tabuleiro (geralmente um 'div' onde as cartas são colocadas).
      const tabuleiro = document.getElementById("tabuleiro");
      // Limpa qualquer conteúdo que possa haver dentro do tabuleiro (remove cartas antigas, se houver).
      tabuleiro.innerHTML = "";
      // Limpa qualquer mensagem de vitória ou instrução anterior.
      document.getElementById("mensagem").textContent = "";
      // Reseta o contador de movimentos para zero no início de um novo jogo.
      movimentos = 0;
      // Atualiza o display dos movimentos para mostrar 0.
      document.getElementById("movimentos").textContent = movimentos;
      
      // Cria a lista de cartas para o novo jogo:
  // 1. Pega o array 'emojis' e o duplica ('[...emojis, ...emojis]'). Isso garante que teremos pares de cada emoji.
  // 2. Usa a função 'embaralhar' (que não foi fornecida no seu código, mas é essencial para um jogo de memória) para misturar os emojis duplicados.
  // 3. O resultado é armazenado na variável 'cartas'.
  cartas = embaralhar([...emojis, ...emojis]); // Assumindo que a função 'embaralhar' existe e funciona.
      console.log(cartas)
   // Agora, cria e adiciona cada carta ao tabuleiro:
  // Percorre o array 'cartas' (que agora contém os emojis embaralhados).
      cartas.forEach(emoji => {
         // Para cada emoji na lista, cria um novo elemento de carta usando a função 'criarCarta'.
        const carta = criarCarta(emoji);
        // Adiciona o elemento 'carta' criado como um filho do elemento 'tabuleiro'.
    
        tabuleiro.appendChild(carta);
      });
    }

    iniciarJogo();
