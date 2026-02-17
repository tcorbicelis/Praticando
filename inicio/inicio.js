// BOTÃO
function mostrarMensagem() {
    document.getElementById("resultado").innerHTML =
    "⚡ A lógica é o poder por trás de todo programador!";
}

// EFEITO MATRIX
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letras = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const tamanhoFonte = 14;
const colunas = canvas.width / tamanhoFonte;

const gotas = [];
for(let x = 0; x < colunas; x++) {
    gotas[x] = 1;
}

function desenhar() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff66";
    ctx.font = tamanhoFonte + "px monospace";

    for(let i = 0; i < gotas.length; i++) {
        const texto = letras.charAt(Math.floor(Math.random() * letras.length));
        ctx.fillText(texto, i * tamanhoFonte, gotas[i] * tamanhoFonte);

        if(gotas[i] * tamanhoFonte > canvas.height && Math.random() > 0.975) {
            gotas[i] = 0;
        }
        gotas[i]++;
    }
}

setInterval(desenhar, 35);

window.addEventListener("resize", () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
});

function abrirTerminal() {
    document.getElementById("terminalModal").style.display = "block";
    document.getElementById("comando").focus();
}

function fecharTerminal() {
    document.getElementById("terminalModal").style.display = "none";
}

const input = document.getElementById("comando");
const terminal = document.getElementById("terminal");

input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        const valor = input.value.trim().toLowerCase();
        adicionarLinha("root@logic:~$ " + valor);
        executarComando(valor);
        input.value = "";
    }
});

function adicionarLinha(texto) {
    const linha = document.createElement("div");
    linha.classList.add("linha");
    linha.innerHTML = texto;
    terminal.insertBefore(linha, terminal.lastElementChild);
}

function executarComando(cmd) {
    const args = cmd.split(" "); // Para separar o comando dos parâmetros
    const principal = args[0];

    switch(principal) {
        case "help":
            adicionarLinha("help - Mostrar comandos");
            adicionarLinha("sobre - Sobre o dev");
            adicionarLinha("clear - Limpar terminal");
            adicionarLinha("soma [a] [b] - Soma dois números");
            adicionarLinha("multiplicar [a] [b] - Multiplica dois números");
            adicionarLinha("parouimpar [n] - Verifica se é par ou ímpar");
            adicionarLinha("fatorial [n] - Calcula o fatorial de um número");
            break;

        case "sobre":
            adicionarLinha("💚 Dev focado em lógica e front-end.");
            break;

        case "soma":
            if(args.length < 3) {
                adicionarLinha("⚠️ Uso: soma [a] [b]");
            } else {
                const a = Number(args[1]);
                const b = Number(args[2]);
                if(isNaN(a) || isNaN(b)) {
                    adicionarLinha("⚠️ Ambos os valores precisam ser números");
                } else {
                    adicionarLinha(`Resultado: ${a} + ${b} = ${a + b}`);
                }
            }
            break;

        case "multiplicar":
            if(args.length < 3) {
                adicionarLinha("⚠️ Uso: multiplicar [a] [b]");
            } else {
                const a = Number(args[1]);
                const b = Number(args[2]);
                if(isNaN(a) || isNaN(b)) {
                    adicionarLinha("⚠️ Ambos os valores precisam ser números");
                } else {
                    adicionarLinha(`Resultado: ${a} * ${b} = ${a * b}`);
                }
            }
            break;

        case "parouimpar":
            if(args.length < 2) {
                adicionarLinha("⚠️ Uso: parouimpar [n]");
            } else {
                const n = Number(args[1]);
                if(isNaN(n)) {
                    adicionarLinha("⚠️ Informe um número válido");
                } else {
                    const resultado = (n % 2 === 0) ? "Par" : "Ímpar";
                    adicionarLinha(`O número ${n} é ${resultado}`);
                }
            }
            break;

        case "fatorial":
            if(args.length < 2) {
                adicionarLinha("⚠️ Uso: fatorial [n]");
            } else {
                const n = Number(args[1]);
                if(isNaN(n) || n < 0) {
                    adicionarLinha("⚠️ Informe um número inteiro não negativo");
                } else {
                    let f = 1;
                    for(let i=1; i<=n; i++) f *= i;
                    adicionarLinha(`Fatorial de ${n} é ${f}`);
                }
            }
            break;

        case "clear":
            terminal.innerHTML = `
                <div class="linha">Terminal v1.0</div>
                <div class="linha">Digite <strong>help</strong> para ver os comandos.</div>
                <br>
                <div class="input-line">
                    <span class="prompt">root@logic:~$</span>
                    <input type="text" id="comando" autofocus>
                </div>
            `;
            const newInput = document.getElementById("comando");
            newInput.addEventListener("keydown", function(e) {
                if (e.key === "Enter") {
                    const valor = newInput.value.trim().toLowerCase();
                    adicionarLinha("root@logic:~$ " + valor);
                    executarComando(valor);
                    newInput.value = "";
                }
            });
            break;

        default:
            adicionarLinha("º Comando não reconhecido");
    }
}