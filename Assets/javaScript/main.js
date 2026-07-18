// ==========================
// Menu mobile (hambúrguer)
// ==========================
const botaoMenu = document.getElementById('botaoHamburguer');
const menu = document.getElementById('menuMobile');
const botaoFechar = document.getElementById('fecharMenuMobile');
const linksDoMenu = menu.querySelectorAll('a');

const DURACAO_TRANSICAO_MENU = 300; // precisa bater com o "transition" do .menu_mobile no CSS

function alternarMenu() {
    const menuAberto = menu.classList.toggle('ativo');

    botaoMenu.classList.toggle('ativo', menuAberto);
    botaoMenu.setAttribute('aria-expanded', menuAberto);
    menu.setAttribute('aria-hidden', !menuAberto);
    document.body.classList.toggle('menu_mobile_aberto', menuAberto);
}

botaoMenu.addEventListener('click', alternarMenu);
botaoFechar.addEventListener('click', alternarMenu);

linksDoMenu.forEach(function (link) {
    link.addEventListener('click', function (evento) {
        const destino = link.getAttribute('href');

        // Se o link aponta para uma section (começa com #), controla o scroll manualmente
        if (destino && destino.startsWith('#')) {
            evento.preventDefault();

            const secaoAlvo = document.querySelector(destino);

            alternarMenu(); // fecha o menu

            // Espera o menu terminar de fechar antes de rolar suavemente até a section
            setTimeout(function () {
                if (secaoAlvo) {
                    secaoAlvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, DURACAO_TRANSICAO_MENU);
        } else {
            alternarMenu();
        }
    });
});

document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && menu.classList.contains('ativo')) {
        alternarMenu();
    }
});

// ==========================
// Nav: esconde ao descer, aparece ao subir
// (só no desktop — no celular a nav fica sempre visível, ver MEDIA_MOBILE abaixo)
// ==========================
(function () {
    const nav = document.querySelector('header');
    const LIMIAR_TOPO = 80;   // dentro dessa faixa do topo, a nav nunca esconde
    const LIMIAR_FUNDO = 40;  // a partir daqui a nav ganha fundo sólido
    const MEDIA_MOBILE = '(max-width: 768px)'; // mesmo valor do breakpoint usado no style.css

    let ultimoScrollY = window.scrollY;
    let tarefaAgendada = false;

    function atualizarNav() {
        const scrollAtual = window.scrollY;
        const rolandoParaBaixo = scrollAtual > ultimoScrollY;
        const emMobile = window.matchMedia(MEDIA_MOBILE).matches;

        nav.classList.toggle('nav--fundo', scrollAtual > LIMIAR_FUNDO);

        // No celular a nav fica sempre visível: nunca recebe a classe de esconder.
        if (emMobile || scrollAtual <= LIMIAR_TOPO) {
            nav.classList.remove('nav--oculta');
        } else if (rolandoParaBaixo) {
            nav.classList.add('nav--oculta');
        } else {
            nav.classList.remove('nav--oculta');
        }

        ultimoScrollY = scrollAtual;
        tarefaAgendada = false;
    }

    window.addEventListener('scroll', function () {
        if (!tarefaAgendada) {
            window.requestAnimationFrame(atualizarNav);
            tarefaAgendada = true;
        }
    }, { passive: true });
})();