let listaDeNumerosSorteados = [ ];
let numeroSecreto = gerarNumeroAleatorio( );
let tentativas = 1; // começa no 1 pq ja conta o acerto junto na contagem de tentativas

//função: um trecho do código que faz uma ação específica que só executa quando é chamado
function exibirTextoNaTela(tag, texto) { 
    let campo = document.querySelector (tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.2}); //reproduz a voz, importado, tem os parâmetros e propriedade para velocidade da voz
}

//chamando a função dentro de outra função pra não repetir o código
function exibirMensagemInicial( ) { 
exibirTextoNaTela("h1", "Jogo do número secreto");
exibirTextoNaTela("p", "Escolha um número de 1 a 10"); 
} 

exibirMensagemInicial( ); 

function verificarChute( ) { 
    let chute = document.querySelector ("input").value; //value pq trabalhamos com valores numericos
    if (chute == numeroSecreto) {
            let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa"; //operador ternário (if/else): caso maior que 1 vai plural, se não singular
            let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;
            exibirTextoNaTela("h1", "Acertou!");
            exibirTextoNaTela("p", mensagemTentativa);  
            document.getElementById("reiniciar").removeAttribute("disabled");
            //seleciona o botão específico e tira o disabled (desativado)         
        } else {
              if (chute > numeroSecreto) { 
                    exibirTextoNaTela("p", "O número secreto é menor");
            } else {
                    exibirTextoNaTela("p", "O número secreto é maior");
            }
            limparCampo( ); //chama a função aqui para sumir só nas erradas 
        }
        tentativas++; //começa a contar aqui pq tem que ser dentro das condições if/else
         
        }
//para limpar o campo após a tentativa coloca as aspas vazias
function limparCampo( ) { 
    chute = document.querySelector("input");
    chute.value = " ";
}
 
function gerarNumeroAleatorio( ) { //palavra reservada p/ sorteio; depois verificar a lista de ns
    let numeroEscolhido = parseInt(Math.random () * 3 + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length; 

    if (quantidadeDeElementosNaLista == 3) { //qnd fecha a quantidade de ns que podem ser sorteados, limpa a lista
        listaDeNumerosSorteados = [ ];
        }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){ //se está dentro da lista, gera outro n
        return gerarNumeroAleatorio( );
    } else { 
        listaDeNumerosSorteados.push(numeroEscolhido); //adiciona o numeroEscolhido na lista
        console.log (listaDeNumerosSorteados); 
        return numeroEscolhido;
    }
}   

function reiniciarJogo( ) { 
    numeroSecreto = gerarNumeroAleatorio( );
    limparCampo( );
    tentativas = 1;
    exibirMensagemInicial( );
    document.getElementById("reiniciar").setAttribute("disabled", true);
}