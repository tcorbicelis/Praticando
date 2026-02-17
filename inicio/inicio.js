// BOTÃO
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
        resultado.innerHTML = "🎉 Você é maior de idade!";
    } else {
        resultado.style.color = "#ff3300";
        resultado.innerHTML = "⛔ Você é menor de idade!";
    }
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
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#008833";
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
    const modal = document.getElementById("terminalModal");
    modal.classList.add("show");  // adiciona a classe para fade + slide
    document.getElementById("comando").focus();
}

function fecharTerminal() {
    const modal = document.getElementById("terminalModal");
    modal.classList.remove("show");
    // opcional: delay para esconder depois da transição
    setTimeout(() => {
        if (!modal.classList.contains("show")) {
            modal.style.display = "none";
        }
    }, 400); // tempo igual ao transition do CSS
}

// Para garantir que o display:block funcione quando abrir
document.querySelectorAll(".terminal-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const modal = document.getElementById("terminalModal");
        modal.style.display = "block"; // necessário antes da transição
        setTimeout(() => modal.classList.add("show"), 10); // delay minúsculo
    });
});

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
    const args = cmd.split(" "); 
    const principal = args[0];

    // Adiciona linha de loading
    const loadingLinha = document.createElement("div");
    loadingLinha.classList.add("linha");
    loadingLinha.innerHTML = "Carregando <span class='loading'></span>";
    terminal.insertBefore(loadingLinha, terminal.lastElementChild);

    // Delay simula processamento
    setTimeout(() => {
        // Remove a linha de loading
        loadingLinha.remove();

        switch(principal) {
            case "help":
                adicionarLinha("help - Mostrar comandos");
                adicionarLinha("sobre - Sobre o dev");
                adicionarLinha("clear - Limpar terminal");
                adicionarLinha("soma [a] [b] - Soma dois números");
                adicionarLinha("multiplicar [a] [b] - Multiplica dois números");
                adicionarLinha("parouimpar [n] - Verifica se é par ou ímpar");
                adicionarLinha("fatorial [n] - Calcula o fatorial de um número");
                adicionarLinha("data - Mostra data e hora atual");
                adicionarLinha("aleatorio [min] [max] - Gera número aleatório");
                adicionarLinha("inverter [texto] - Inverte o texto fornecido");
                adicionarLinha("contar [n] - Conta de 1 até n");
                adicionarLinha("pi - Mostra o valor de π");
                adicionarLinha("site [url] - Simula abertura de site");
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

            case "data":
                const agora = new Date();
                adicionarLinha(`📅 Data: ${agora.toLocaleDateString()} 🕒 Hora: ${agora.toLocaleTimeString()}`);
                break;

            case "aleatorio":
                if(args.length < 3) {
                    adicionarLinha("⚠️ Uso: aleatorio [min] [max]");
                } else {
                    const min = Number(args[1]);
                    const max = Number(args[2]);
                    if(isNaN(min) || isNaN(max)) {
                        adicionarLinha("⚠️ Ambos os valores precisam ser números");
                    } else {
                        const rand = Math.floor(Math.random() * (max - min + 1)) + min;
                        adicionarLinha(`🎲 Número aleatório entre ${min} e ${max}: ${rand}`);
                    }
                }
                break;

            case "inverter":
                if(args.length < 2) {
                    adicionarLinha("⚠️ Uso: inverter [texto]");
                } else {
                    const texto = args.slice(1).join(" ");
                    const invertido = texto.split("").reverse().join("");
                    adicionarLinha(`🔄 Texto invertido: ${invertido}`);
                }
                break;

            case "contar":
                if(args.length < 2) {
                    adicionarLinha("⚠️ Uso: contar [n]");
                } else {
                    const n = Number(args[1]);
                    if(isNaN(n) || n < 1) {
                        adicionarLinha("⚠️ Informe um número inteiro maior que 0");
                    } else {
                        let contagem = "";
                        for(let i = 1; i <= n; i++) {
                            contagem += i + " ";
                        }
                        adicionarLinha(`🔢 Contagem: ${contagem}`);
                    }
                }
                break;

            case "pi":
                adicionarLinha(`π ≈ ${Math.PI.toFixed(10)}`);
                break;

            case "site":
                if(args.length < 2) {
                    adicionarLinha("⚠️ Uso: site [url]");
                } else {
                    const url = args[1];
                    adicionarLinha(`🌐 Abriria o site: ${url}`);
                }
                break;    

            default:
                adicionarLinha("º Comando não reconhecido");
        }
    }, 800); // tempo de loading em ms (0.8s)
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