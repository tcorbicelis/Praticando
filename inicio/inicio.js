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
    switch(cmd) {
        case "help":
            adicionarLinha("help - Mostrar comandos");
            adicionarLinha("sobre - Sobre o dev");
            adicionarLinha("clear - Limpar");
            break;

        case "sobre":
            adicionarLinha("💚 Dev focado em lógica e front-end.");
            break;

case "clear":
    // Limpa todas as linhas, mantendo o input
    terminal.innerHTML = `
        <div class="linha">⚡ Dark Logic Terminal v1.0</div>
        <div class="linha">Digite <strong>help</strong> para ver os comandos.</div>
        <br>
        <div class="input-line">
            <span class="prompt">root@darklogic:~$</span>
            <input type="text" id="comando" autofocus>
        </div>
    `;

    // Atualiza a referência do input para continuar funcionando
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
            adicionarLinha("❌ Comando não reconhecido");
    }
}