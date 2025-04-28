document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Alternar o ícone do menu
            const icon = menuToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Fechar o menu ao clicar em um link
    const navLinkItems = document.querySelectorAll('.nav-link');
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Scroll suave para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Botão "voltar ao topo"
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animação de entrada ao rolar a página
    const sections = document.querySelectorAll('.section-animation');
    
    function checkVisibility() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionBottom = section.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight - 100 && sectionBottom > 0) {
                section.classList.add('visible');
            }
        });
    }
    
    // Verificar visibilidade inicial
    checkVisibility();
    
    // Verificar visibilidade ao rolar
    window.addEventListener('scroll', checkVisibility);
    
    // Tema escuro/claro
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const body = document.body;
    
    // Verificar se há preferência de tema salva no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
        
        if (body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Formulário de contato
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter os valores do formulário
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Em um caso real, você enviaria estes dados para um servidor
            // Aqui apenas simulamos uma resposta bem-sucedida após um breve atraso
            const submitButton = contactForm.querySelector('.submit-btn');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                // Mostrar mensagem de agradecimento
                contactForm.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle" style="font-size: 48px; color: var(--secondary-color); margin-bottom: 20px;"></i>
                        <h3>Mensagem Enviada!</h3>
                        <p>Obrigado ${name}, sua mensagem foi recebida. Responderei em breve!</p>
                    </div>
                `;
                
                // Limpar o formulário
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('message').value = '';
            }, 1500);
        });
    }
    
    // Animação para os cartões de projetos
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-in');
    });
    
    // Animação para a linha do tempo
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(' + (index % 2 === 0 ? '-50px' : '50px') + ')';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        item.style.transitionDelay = `${index * 0.3}s`;
    });
    
    // Função para animar a linha do tempo quando ela estiver visível
    function animateTimeline() {
        const timeline = document.querySelector('.timeline');
        if (!timeline) return;
        
        const timelinePosition = timeline.getBoundingClientRect().top;
        if (timelinePosition < window.innerHeight - 150) {
            timelineItems.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            });
            // Remover o evento após a animação para otimizar o desempenho
            window.removeEventListener('scroll', animateTimeline);
        }
    }
    
    // Verificar a posição da linha do tempo inicialmente
    animateTimeline();
    
    // Verificar ao rolar
    window.addEventListener('scroll', animateTimeline);

    // Adiciona efeito de hover aos ícones de habilidades
    const skillIcons = document.querySelectorAll('.skill-icon');
    skillIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = icon.getAttribute('alt');
            
            // Posicionar tooltip acima do ícone
            const iconRect = icon.getBoundingClientRect();
            tooltip.style.position = 'absolute';
            tooltip.style.top = (iconRect.top - 35) + 'px';
            tooltip.style.left = (iconRect.left + iconRect.width/2 - 50) + 'px';
            tooltip.style.backgroundColor = 'var(--theme-color)';
            tooltip.style.color = '#fff';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.zIndex = '100';
            tooltip.style.width = '100px';
            tooltip.style.textAlign = 'center';
            tooltip.style.fontSize = '0.8rem';
            
            document.body.appendChild(tooltip);
            
            icon.addEventListener('mouseleave', function() {
                document.body.removeChild(tooltip);
            });
        });
    });
});