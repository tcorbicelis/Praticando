// ========================================
// VERIFICAR IDADE
// ========================================

function verificarIdade() {
    const idade = Number(document.getElementById("idadeInput").value);
    const resultado = document.getElementById("resultado");

    if (isNaN(idade) || idade < 0) {
        resultado.style.color = "red";
        resultado.innerHTML = "⚠️ Por favor, digite uma idade válida!";
        return;
    }

    if (idade >= 18) {
        resultado.style.color = "#00ff66";
        resultado.innerHTML = "✅ Você é maior de idade!";
    } else {
        resultado.style.color = "#ff3300";
        resultado.innerHTML = "⛔ Você é menor de idade!";
    }
}

// ========================================
// EFEITO MATRIX (OTIMIZADO)
// ========================================

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

let letras = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let tamanhoFonte = 14;
let colunas;
let gotas = [];

function iniciarMatrix() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    colunas = Math.floor(canvas.width / tamanhoFonte);
    gotas = [];

    for (let x = 0; x < colunas; x++) {
        gotas[x] = 1;
    }
}

function desenhar() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#008833";
    ctx.font = tamanhoFonte + "px monospace";

    for (let i = 0; i < gotas.length; i++) {
        const texto = letras.charAt(Math.floor(Math.random() * letras.length));
        ctx.fillText(texto, i * tamanhoFonte, gotas[i] * tamanhoFonte);

        if (gotas[i] * tamanhoFonte > canvas.height && Math.random() > 0.975) {
            gotas[i] = 0;
        }
        gotas[i]++;
    }

    requestAnimationFrame(desenhar);
}

window.addEventListener("resize", iniciarMatrix);

iniciarMatrix();
desenhar();

// ========================================
// TERMINAL
// ========================================

const terminal = document.getElementById("terminal");
let input = document.getElementById("comando");

function abrirTerminal() {
    const modal = document.getElementById("terminalModal");
    modal.style.display = "block";
    setTimeout(() => modal.classList.add("show"), 10);
    input.focus();
}

function fecharTerminal() {
    const modal = document.getElementById("terminalModal");
    modal.classList.remove("show");
    setTimeout(() => modal.style.display = "none", 400);
}

function adicionarLinha(texto) {
    const linha = document.createElement("div");
    linha.classList.add("linha");
    linha.innerHTML = texto;
    terminal.insertBefore(linha, terminal.lastElementChild);

    terminal.scrollTop = terminal.scrollHeight;
}

function configurarInput() {
    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            const valor = input.value.trim().toLowerCase();
            adicionarLinha("root@logic:~$ " + valor);
            executarComando(valor);
            input.value = "";
        }
    });
}

configurarInput();

// ========================================
// EXECUTAR COMANDO
// ========================================

function executarComando(cmd) {

    const args = cmd.split(" ");
    const principal = args[0];

    const loadingLinha = document.createElement("div");
    loadingLinha.classList.add("linha");
    loadingLinha.innerHTML = "Carregando <span class='loading'></span>";
    terminal.insertBefore(loadingLinha, terminal.lastElementChild);

    setTimeout(() => {

        loadingLinha.remove();

        switch (principal) {

            case "help":
                adicionarLinha("help - Mostrar comandos");
                adicionarLinha("sobre - Sobre o dev");
                adicionarLinha("clear - Limpar terminal");
                adicionarLinha("soma [a] [b]");
                adicionarLinha("multiplicar [a] [b]");
                adicionarLinha("parouimpar [n]");
                adicionarLinha("fatorial [n]");
                adicionarLinha("data");
                adicionarLinha("aleatorio [min] [max]");
                adicionarLinha("inverter [texto]");
                adicionarLinha("contar [n]");
                adicionarLinha("pi");
                adicionarLinha("hackear sistema");
                break;

            case "sobre":
                adicionarLinha("Dev focado em lógica e front-end.");
                break;

            case "clear":
                const linhas = terminal.querySelectorAll(".linha");
                linhas.forEach(l => l.remove());
                adicionarLinha("Terminal limpo.");
                break;

            case "soma":
                if (args.length < 3) {
                    adicionarLinha("Uso: soma [a] [b]");
                } else {
                    const a = Number(args[1]);
                    const b = Number(args[2]);
                    if (isNaN(a) || isNaN(b)) {
                        adicionarLinha("Valores precisam ser números");
                    } else {
                        adicionarLinha(`Resultado: ${a + b}`);
                    }
                }
                break;

            case "multiplicar":
                if (args.length < 3) {
                    adicionarLinha("Uso: multiplicar [a] [b]");
                } else {
                    const a = Number(args[1]);
                    const b = Number(args[2]);
                    if (isNaN(a) || isNaN(b)) {
                        adicionarLinha("Valores precisam ser números");
                    } else {
                        adicionarLinha(`Resultado: ${a * b}`);
                    }
                }
                break;

            case "parouimpar":
                const n = Number(args[1]);
                if (isNaN(n)) {
                    adicionarLinha("Informe um número válido");
                } else {
                    adicionarLinha(n % 2 === 0 ? "Par" : "Ímpar");
                }
                break;

            case "fatorial":
                const num = Number(args[1]);
                if (isNaN(num) || num < 0) {
                    adicionarLinha("Número inválido");
                } else {
                    let f = 1;
                    for (let i = 1; i <= num; i++) f *= i;
                    adicionarLinha(`Fatorial: ${f}`);
                }
                break;

            case "data":
                const agora = new Date();
                adicionarLinha(agora.toLocaleString());
                break;

            case "aleatorio":
                const min = Number(args[1]);
                const max = Number(args[2]);

                if (isNaN(min) || isNaN(max)) {
                    adicionarLinha("Uso: aleatorio [min] [max]");
                }
                else if (min > max) {
                    adicionarLinha("Min não pode ser maior que Max");
                }
                else {
                    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
                    adicionarLinha(`Número: ${rand}`);
                }
                break;

            case "inverter":
                const texto = args.slice(1).join(" ");
                adicionarLinha(texto.split("").reverse().join(""));
                break;

            case "contar":
                const limite = Number(args[1]);
                if (isNaN(limite) || limite < 1) {
                    adicionarLinha("Número inválido");
                } else {
                    let contagem = "";
                    for (let i = 1; i <= limite; i++) {
                        contagem += i + " ";
                    }
                    adicionarLinha(contagem);
                }
                break;

            case "pi":
                adicionarLinha(`π ≈ ${Math.PI.toFixed(10)}`);
                break;

            case "hackear":
                if (args[1] === "sistema") {
                    hackearSistema();
                } else {
                    adicionarLinha("Uso: hackear sistema");
                }
                break;

            default:
                adicionarLinha("Comando não reconhecido");
        }

    }, 800);
}

// ========================================
// HACK FAKE 😈
// ========================================

function hackearSistema() {

    let progresso = 0;

    adicionarLinha("Iniciando ataque ao sistema...");

    const intervalo = setInterval(() => {

        progresso += Math.floor(Math.random() * 12) + 8;

        if (progresso >= 100) progresso = 100;

        adicionarLinha("Invadindo firewall... " + progresso + "%");

        if (progresso === 100) {
            clearInterval(intervalo);

            setTimeout(() => adicionarLinha("Quebrando criptografia AES-256..."), 600);
            setTimeout(() => adicionarLinha("Escalando privilégios..."), 1300);
            setTimeout(() => adicionarLinha("Acesso ROOT concedido!"), 2000);
            setTimeout(() => {
                adicionarLinha("Sistema comprometido com sucesso");
                efeitoTelaHack();
            }, 2800);
        }

    }, 400);
}

function efeitoTelaHack() {

    let piscadas = 0;

    const glitch = setInterval(() => {
        document.body.style.backgroundColor =
            piscadas % 2 === 0 ? "#001100" : "black";

        document.body.style.filter =
            piscadas % 2 === 0 ? "contrast(150%) brightness(120%)" : "none";

        piscadas++;

        if (piscadas > 12) {
            clearInterval(glitch);
            document.body.style.backgroundColor = "black";
            document.body.style.filter = "none";
        }

    }, 100);
}

function mostrarErro() {
    const erroModal = document.getElementById("erroModal");
    erroModal.style.display = "block";
    setTimeout(() => {
        erroModal.classList.add("show"); // aplica fade + slide
    }, 10);
}

function fecharErro() {
    const erroModal = document.getElementById("erroModal");
    erroModal.classList.remove("show");
    setTimeout(() => {
        erroModal.style.display = "none";
    }, 400); // tempo igual ao transition do CSS
}

// Dispara a cada 5 segundos
setInterval(() => {
    mostrarErro();
}, 30000);