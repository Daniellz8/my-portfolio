/* work Section */

// Seleciona o contêiner de projetos, os botões e o novo contêiner dos círculos
const projectCardsContainer = document.getElementById('project-cards-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const projectItems = document.querySelectorAll('.work-item');
const projectDotsContainer = document.getElementById('project-dots');

let currentIndex = 0;
const totalProjects = projectItems.length;
const cardGap = 40; // O espaçamento entre os cards no CSS

// Função principal para rolar o carrossel para um índice específico
const scrollToProject = (index) => {
    // Garante que o índice não saia dos limites
    if (index < 0 || index >= totalProjects) {
        return; // Sai da função se o índice for inválido
    }

    currentIndex = index;
    const scrollPosition = (projectItems[0].offsetWidth + cardGap) * currentIndex;
    
    // Usa a nova API de rolagem para um comportamento mais confiável
    projectCardsContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });

    updateDots();
};

// Função para criar os círculos dinamicamente
const createDots = () => {
    for (let i = 0; i < totalProjects; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.setAttribute('data-index', i);
        projectDotsContainer.appendChild(dot);

        // Adiciona o evento de clique para cada ponto
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            scrollToProject(index);
        });
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
    scrollToProject(currentIndex + 1);
});

// Ação para o botão "Anterior"
prevBtn.addEventListener('click', () => {
    scrollToProject(currentIndex - 1);
});

// Inicializa a criação e o estado dos círculos ao carregar a página
createDots();
updateDots();