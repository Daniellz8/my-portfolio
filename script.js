// Seleciona todos os links da barra de navegação
const navLinks = document.querySelectorAll('.nav-link');

// Seleciona todas as seções da página com um ID
const sections = document.querySelectorAll('section');

// Função para atualizar a classe 'active-link'
const updateNavLink = () => {
  // Pega a posição de rolagem atual
  const scrollPosition = window.scrollY;

  // Itera sobre cada seção para verificar qual está visível
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150; // Adiciona um pequeno offset
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    // Verifica se a posição de rolagem está dentro da seção
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Remove a classe 'active-link' de todos os links
      navLinks.forEach(link => link.classList.remove('active-link'));

      // Adiciona a classe 'active-link' ao link correspondente
      const currentLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
      if (currentLink) {
        currentLink.classList.add('active-link');
      }
    }
  });
};

// Adiciona o evento de scroll para chamar a função de atualização
window.addEventListener('scroll', updateNavLink);

// Chama a função uma vez ao carregar a página
updateNavLink();

/*===========================================================*/
/*===========================================================*/
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
    // Nova lógica de rolagem infinita
    if (index < 0) {
        currentIndex = totalProjects - 1; // Se for para a esquerda no início, vai para o último
    } else if (index >= totalProjects) {
        currentIndex = 0; // Se for para a direita no final, volta para o primeiro
    } else {
        currentIndex = index; // Se estiver no meio, navega normalmente
    }

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
    projectDotsContainer.innerHTML = '';
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

// Adiciona um evento de rolagem ao contêiner de projetos para atualizar os círculos
projectCardsContainer.addEventListener('scroll', () => {
    // Calcula a largura de um card, incluindo o espaçamento (gap)
    const cardWidth = projectItems[0].offsetWidth + cardGap;
    
    // Calcula o novo índice do card com base na posição da rolagem
    // Math.round arredonda para o número inteiro mais próximo, garantindo que o card mais visível seja selecionado
    const newIndex = Math.round(projectCardsContainer.scrollLeft / cardWidth);

    // Evita atualizações desnecessárias se o índice não mudou
    if (newIndex !== currentIndex) {
        currentIndex = newIndex;
        updateDots();
    }
});