let modoJogoAtivo = false;

//===============
// TEMAS
//===============
const temas = {
    verde: {
        principal: "#00ff66",
        fundo: "black"
    },
    azul: {
        principal: "#00ffff",
        fundo: "#001122"
    },
    vermelho: {
        principal: "#ff0033",
        fundo: "#1a0000"
    },
    roxo: {
        principal: "#bb00ff",
        fundo: "#0f001a"
    },
    laranja: {
        principal: "#FF8C00",
        fundo: "#0f001a"
    },
    branco: {
        principal: "#ffffff",
        fundo: "#0f001a"
    },
    invertido: {
        principal: "#0f001a",
        fundo: "#ffffff"
    }
};

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
// EFEITO VISUAL
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

    const estilos = getComputedStyle(document.documentElement);
    const corAtual = estilos.getPropertyValue('--cor-principal').trim();
    const fundoAtual = estilos.getPropertyValue('--cor-fundo').trim();

    ctx.globalAlpha = 0.15;
    ctx.fillStyle = fundoAtual;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    ctx.fillStyle = corAtual;
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
                adicionarLinha("theme");
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

            case "escolha":

                if (!modoJogoAtivo) {
                    adicionarLinha("Nenhuma decisão pendente.");
                    break;
                }

                const opcao = args[1];

                if (opcao === "1") {
                finalDesconectar();
                } 
                else if (opcao === "2") {
                finalMascarar();
                } 
                else if (opcao === "3") {
                finalContinuar();
                } 
                else {
                adicionarLinha("Escolha inválida. Use 1, 2 ou 3.");
                }

                modoJogoAtivo = false;
                break;
            
            case "theme":

                const nomeTema = args[1];

                if (!nomeTema) {
                    adicionarLinha("Uso: theme [nome]");
                    adicionarLinha("Temas disponíveis: verde, azul, vermelho, roxo, laranja, branco, invertido");
                    break;
                }

                if (!temas.hasOwnProperty(nomeTema)) {
                    adicionarLinha("Tema não encontrado.");
                    adicionarLinha("Use: theme verde | azul | vermelho | roxo | laranja | branco | invertido");
                    break;
                }

                aplicarTema(nomeTema);
                adicionarLinha("Tema alterado para: " + nomeTema);
                break;

            default:
                adicionarLinha("Comando não reconhecido");
            }

    }, 800);
}

//===============
// TEMA
//===============
function aplicarTema(nome) {

    const tema = temas[nome];

    document.documentElement.style.setProperty('--cor-principal', tema.principal);
    document.documentElement.style.setProperty('--cor-fundo', tema.fundo);

}

// ========================================
// HACK FAKE
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
                adicionarLinha("Listando arquivos secretos...");
                simularArquivosSecretos();
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

function simularArquivosSecretos() {

    const arquivos = [
        "/root/acesso.conf",
        "/etc/firewall.override",
        "/home/admin/passwords.txt",
        "/database/clientes.db",
        "/sistema/nuclear/codigos.txt",
        "/gov/area51/segredo_maximo.zip",
        "/financeiro/contas_bancarias.xls",
        "/darkweb/bitcoin_wallet.dat",
        "/servidor/backup_proibido.tar.gz"
    ];

    let index = 0;

    const intervaloArquivos = setInterval(() => {

        adicionarLinha("✔ " + arquivos[index]);

        index++;

        if (index >= arquivos.length) {
            clearInterval(intervaloArquivos);

            setTimeout(() => {
                adicionarLinha("Download dos arquivos iniciado...");
            }, 800);

            setTimeout(() => {
                adicionarLinha("Transferindo dados █▒▒▒▒▒▒▒ 10%");
            }, 1500);

            setTimeout(() => {
                adicionarLinha("Transferindo dados █████▒▒▒ 65%");
            }, 2200);

            setTimeout(() => {
                adicionarLinha("Transferindo dados █████████ 100%");
            }, 3000);

            setTimeout(() => {
                adicionarLinha("Arquivos extraídos com sucesso");
                iniciarRastreamento();
            }, 3800);
        }

    }, 500);
}

function iniciarRastreamento() {

    modoJogoAtivo = true;

    adicionarLinha("⚠ ATIVIDADE SUSPEITA DETECTADA ⚠");

    const ipFake = gerarIPFake();
    adicionarLinha("Rastreando IP: " + ipFake);

    let progresso = 0;

    const rastreio = setInterval(() => {

        progresso += Math.floor(Math.random() * 20) + 10;

        if (progresso >= 100) progresso = 100;

        adicionarLinha("Localizando origem... " + progresso + "%");

        if (progresso === 100) {
            clearInterval(rastreio);

            setTimeout(() => {
                adicionarLinha("IP localizado!");
                adicionarLinha("País: Brasil");
                adicionarLinha("Cidade: Macaé");
                adicionarLinha("Provedor: Rede Segura");
            }, 800);

            setTimeout(() => {
                adicionarLinha("");
                adicionarLinha("Escolha uma ação:");
                adicionarLinha("1 - Desconectar");
                adicionarLinha("2 - Mascarar IP");
                adicionarLinha("3 - Continuar ataque");
                adicionarLinha("Digite: escolha [1-3]");
            }, 2000);
        }

    }, 500);
}

function gerarIPFake() {
    return `${rand255()}.${rand255()}.${rand255()}.${rand255()}`;
}

function rand255() {
    return Math.floor(Math.random() * 256);
}

function contagemRegressiva() {

    let tempo = 5;

    adicionarLinha("CONTRA-ATAQUE INICIADO");

    const countdown = setInterval(() => {

        adicionarLinha("Sistema será bloqueado em: " + tempo + "s");

        tempo--;

        if (tempo < 0) {
            clearInterval(countdown);

            adicionarLinha("CONEXÃO INTERROMPIDA.");
            adicionarLinha("Você escapou por pouco...");

            efeitoTelaHackPesado();
        }

    }, 1000);
}

function efeitoTelaHackPesado() {

    let piscadas = 0;

    const glitch = setInterval(() => {

        document.body.style.backgroundColor =
            piscadas % 2 === 0 ? "darkred" : "black";

        document.body.style.filter =
            piscadas % 2 === 0 ? "contrast(200%) brightness(150%) hue-rotate(90deg)" : "none";

        piscadas++;

        if (piscadas > 20) {
            clearInterval(glitch);
            document.body.style.backgroundColor = "black";
            document.body.style.filter = "none";
        }

    }, 80);
}

function finalDesconectar() {

    adicionarLinha("Desconectando...");
    
    setTimeout(() => {
        adicionarLinha("Conexão encerrada com sucesso.");
        adicionarLinha("Você escapou sem deixar rastros");
        efeitoTelaHack();
    }, 1500);
}

function finalMascarar() {

    adicionarLinha("Ativando VPN clandestina...");

    setTimeout(() => {
        adicionarLinha("IP mascarado com sucesso.");
        adicionarLinha("Novo IP: " + gerarIPFake());
    }, 1500);

    setTimeout(() => {
        adicionarLinha("Rastreamento perdido.");
        adicionarLinha("Você se tornou invisível");
        efeitoTelaHack();
    }, 2500);
}

function finalContinuar() {

    adicionarLinha("Ignorando rastreamento...");
    adicionarLinha("Continuando invasão...");

    setTimeout(() => {
        adicionarLinha("SISTEMA DE DEFESA ATIVADO");
    }, 1500);

    setTimeout(() => {
        adicionarLinha("Você foi identificado!");
    }, 2500);

    setTimeout(() => {
        adicionarLinha("ACESSO BLOQUEADO.");
        adicionarLinha("Fim de jogo");
        efeitoTelaHackPesado();
    }, 3500);
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