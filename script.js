// ============================================
// DARK MODE
// ============================================
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Verificar preferência salva
const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') {
    body.classList.add('dark-mode');
    updateDarkModeIcon();
}

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.setItem('darkMode', 'disabled');
    }
    
    updateDarkModeIcon();
});

function updateDarkModeIcon() {
    const icon = darkModeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ============================================
// MENU HAMBURGER
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ============================================
// SCROLL REVEAL
// ============================================
ScrollReveal().reveal('[data-reveal]', {
    duration: 1000,
    distance: 50,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    interval: 200,
    scale: 1,
    opacity: 0,
    origin: 'bottom'
});

// ============================================
// CONTADORES ANIMADOS
// ============================================
const counters = document.querySelectorAll('.counter');
const speed = 50;
let started = false;

function startCounters() {
    if (started) return;
    started = true;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 50);
            } else {
                counter.innerText = target.toLocaleString('pt-BR');
            }
        };
        
        updateCount();
    });
}

// Iniciar contadores quando a seção for visível
const countersSection = document.querySelector('.counters-section');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters();
        }
    });
}, observerOptions);

if (countersSection) {
    observer.observe(countersSection);
}

// ============================================
// QUIZ
// ============================================
function verificarQuiz() {
    const respostas = {
        q1: 'option1',
        q2: 'option0',
        q3: 'option0'
    };
    
    let acertos = 0;
    let total = 3;
    
    // Verificar Pergunta 1
    const q1 = document.querySelector('input[name="q1"]:checked');
    if (q1) {
        const options = document.querySelectorAll('input[name="q1"]');
        if (Array.from(options).indexOf(q1) === 0) {
            acertos++;
        }
    }
    
    // Verificar Pergunta 2
    const q2 = document.querySelector('input[name="q2"]:checked');
    if (q2) {
        const options = document.querySelectorAll('input[name="q2"]');
        if (Array.from(options).indexOf(q2) === 0) {
            acertos++;
        }
    }
    
    // Verificar Pergunta 3
    const q3 = document.querySelector('input[name="q3"]:checked');
    if (q3) {
        const options = document.querySelectorAll('input[name="q3"]');
        if (Array.from(options).indexOf(q3) === 0) {
            acertos++;
        }
    }
    
    const resultDiv = document.getElementById('quizResult');
    const percentual = (acertos / total * 100).toFixed(0);
    
    let mensagem = '';
    if (acertos === 3) {
        mensagem = `🎉 Parabéns! Você acertou ${acertos}/${total} (${percentual}%)! Você é um especialista em sustentabilidade!`;
    } else if (acertos === 2) {
        mensagem = `👍 Ótimo! Você acertou ${acertos}/${total} (${percentual}%)! Continue aprendendo!`;
    } else if (acertos === 1) {
        mensagem = `📚 Bom começo! Você acertou ${acertos}/${total} (${percentual}%)! Estude mais sobre o tema!`;
    } else {
        mensagem = `💡 Que tal aprender mais? Você acertou ${acertos}/${total} (${percentual}%)! Leia nossos artigos!`;
    }
    
    resultDiv.textContent = mensagem;
    resultDiv.classList.add('show');
    
    // Scroll para resultado
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ============================================
// FORMULÁRIO DE CONTATO
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const idade = document.getElementById('idade').value;
        const mensagem = document.getElementById('mensagem').value;
        
        // Validação simples
        if (!nome || !email || !mensagem) {
            alert('Por favor, preencha todos os campos obrigatórios!');
            return;
        }
        
        // Aqui você pode enviar o formulário para um servidor
        console.log({
            nome,
            email,
            idade,
            mensagem,
            data: new Date().toLocaleString('pt-BR')
        });
        
        // Mensagem de sucesso
        alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso! 🌱`);
        
        // Limpar formulário
        contactForm.reset();
        
        // Aqui você poderia enviar via email usando um serviço como EmailJS
        // Exemplo descomentado abaixo:
        /*
        emailjs.send("service_id", "template_id", {
            to_email: email,
            from_name: nome,
            message: mensagem,
            idade: idade
        }).then(() => {
            alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso! 🌱`);
            contactForm.reset();
        }).catch((error) => {
            console.error('Erro ao enviar:', error);
            alert('Houve um erro ao enviar sua mensagem. Tente novamente!');
        });
        */
    });
}

// ============================================
// CRÉDITOS MODAL
// ============================================
const creditsToggle = document.getElementById('creditsToggle');
const creditsModal = document.getElementById('creditsModal');

if (creditsToggle) {
    creditsToggle.addEventListener('click', () => {
        creditsModal.classList.add('show');
    });
}

function fecharCreditos() {
    creditsModal.classList.remove('show');
}

// Fechar modal ao clicar fora
if (creditsModal) {
    creditsModal.addEventListener('click', (e) => {
        if (e.target === creditsModal) {
            fecharCreditos();
        }
    });
}

// ============================================
// SCROLL SUAVE
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// HOVER EFFECTS - BOTÕES
// ============================================
const buttons = document.querySelectorAll('.cta-button, .play-btn, .credits-toggle');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// ANIMAÇÃO DE NÚMEROS (Contadores)
// ============================================
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerText = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// ============================================
// EFEITOS PARALLAX (Opcional)
// ============================================
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.background-shape');
    
    parallaxElements.forEach((element, index) => {
        element.style.transform = `translateY(${scrollTop * 0.5 * (index + 1)}px)`;
    });
});

// ============================================
// VALIDAÇÃO DE EMAIL
// ============================================
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌱 Raízes do Agro carregado com sucesso!');
    
    // Adicionar animação de carregamento
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.5s ease-in';
    }, 100);
});

// ============================================
// EVENT LISTENERS ADICIONAIS
// ============================================

// Mostrar/esconder botão voltar ao topo
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #27ae60;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 99;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
    font-size: 1.2rem;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
        scrollTopBtn.style.alignItems = 'center';
        scrollTopBtn.style.justifyContent = 'center';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 6px 20px rgba(39, 174, 96, 0.5)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 15px rgba(39, 174, 96, 0.3)';
});

// ============================================
// CARREGAMENTO DE CONTEÚDO
// ============================================
window.addEventListener('load', () => {
    // Remover splash screen se houver
    const splash = document.querySelector('.splash-screen');
    if (splash) {
        splash.style.opacity = '0';
        setTimeout(() => splash.remove(), 500);
    }
});

// ============================================
// DETECÇÃO DE CONEXÃO
// ============================================
window.addEventListener('online', () => {
    console.log('✅ Conexão restaurada!');
});

window.addEventListener('offline', () => {
    console.log('❌ Sem conexão com internet');
});

// ============================================
// CONTROLE DE VOLUME DE PODCAST (Exemplo)
// ============================================
const playButtons = document.querySelectorAll('.play-btn');

playButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        alert('🎙️ Em breve, você poderá ouvir nossos podcasts diretamente aqui! Visite novamente em breve.');
    });
});

// ============================================
// ANALYTICS SIMPLES
// ============================================
function registrarVisita() {
    const visitas = localStorage.getItem('visits') || 0;
    localStorage.setItem('visits', parseInt(visitas) + 1);
    console.log(`📊 Total de visitas: ${parseInt(visitas) + 1}`);
}

registrarVisita();
