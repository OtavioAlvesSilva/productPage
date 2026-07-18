const botaoMenu = document.getElementById('botaoHamburguer');
const menu = document.getElementById('menuMobile');
const botaoFechar = document.getElementById('fecharMenuMobile');
const linksDoMenu = menu.querySelectorAll('a');

const DURACAO_TRANSICAO_MENU = 300; 

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

        if (destino && destino.startsWith('#')) {
            evento.preventDefault();

            const secaoAlvo = document.querySelector(destino);

            alternarMenu();

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

(function () {
    const nav = document.querySelector('header');
    const LIMIAR_FUNDO = 40; 

    let tarefaAgendada = false;

    function atualizarNav() {
        nav.classList.toggle('nav--fundo', window.scrollY > LIMIAR_FUNDO);
        tarefaAgendada = false;
    }

    window.addEventListener('scroll', function () {
        if (!tarefaAgendada) {
            window.requestAnimationFrame(atualizarNav);
            tarefaAgendada = true;
        }
    }, { passive: true });
})();