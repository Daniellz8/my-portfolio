// Seleciona todas as seções e todos os links da barra lateral
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

// Função para atualizar o link ativo
const updateActiveLink = () => {
    let current = '';
    const scrollPosition = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-link');
        
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active-link');
        }
    });
};

// Adiciona o evento de scroll para chamar a função
window.addEventListener('scroll', updateActiveLink);
// Chama a função uma vez ao carregar a página
updateActiveLink();

/*===========================================================*/
/*===========================================================*/
/* work Section */

// Seleciona o contêiner de projetos, os botões e o novo contêiner dos círculos
const projectCardsContainer = document.getElementById('project-cards-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const projectItems = document.querySelectorAll('.work-item');
const projectDotsContainer = document.getElementById('project-dots');

let currentIndex = 0;
const totalProjects = projectItems.length;

// Função para criar os círculos dinamicamente
const createDots = () => {
    for (let i = 0; i < totalProjects; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.setAttribute('data-index', i);
        projectDotsContainer.appendChild(dot);
    }
};

// Função para atualizar o estado dos círculos
const updateDots = () => {
    const dots = projectDotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentIndex) {
            dot.classList.add('active');
        }
    });
};

// Ação para o botão "Próximo"
nextBtn.addEventListener('click', () => {
    if (currentIndex < totalProjects - 1) {
        currentIndex++;
        const cardWidth = projectCardsContainer.querySelector('.work-item').offsetWidth;
        projectCardsContainer.scrollLeft += cardWidth + 40; // Rola para o próximo card
        updateDots();
    }
});

// Ação para o botão "Anterior"
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        const cardWidth = projectCardsContainer.querySelector('.work-item').offsetWidth;
        projectCardsContainer.scrollLeft -= cardWidth + 40; // Rola para o card anterior
        updateDots();
    }
});

// Inicializa a criação e o estado dos círculos ao carregar a página
createDots();
updateDots();