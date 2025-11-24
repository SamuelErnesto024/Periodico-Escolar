document.addEventListener('DOMContentLoaded', () => {
    // LÓGICA DE PANTALLA DE BIENVENIDA (SPLASH SCREEN)
    const splashScreen = document.getElementById('splash-screen');
    const enterButton = document.getElementById('enter-button');
    const mainHeader = document.querySelector('.main-header');
    const mainNav = document.querySelector('.main-nav');
    const contentArea = document.querySelector('.content-area');
    const mainFooter = document.querySelector('.main-footer');

    // Ocultar contenido principal hasta entrar
    mainHeader.style.display = 'none';
    mainNav.style.display = 'none';
    contentArea.style.display = 'none';
    mainFooter.style.display = 'none';

    enterButton.addEventListener('click', () => {
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.display = 'none';
            // Mostrar contenido principal
            mainHeader.style.display = 'block';
            mainNav.style.display = 'block';
            contentArea.style.display = 'block';
            mainFooter.style.display = 'block';
            
            // *** INICIAR ESCUCHA DE SCROLL DESPUÉS DE ENTRAR ***
            if (mainNav) {
                window.addEventListener('scroll', handleScroll);
            }
        }, 500); // 500ms para que termine la transición CSS
    });

    // LÓGICA DE NAVEGACIÓN POR BOTONES
    const navButtons = document.querySelectorAll('.nav-button');
    const contentSections = document.querySelectorAll('.content-section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');

            // 1. Desactivar todos los botones y secciones
            navButtons.forEach(btn => btn.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));

            // 2. Activar el botón clicado y la sección correspondiente
            button.classList.add('active');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Al hacer click, sube al principio para que la navegación esté visible
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // =========================================================
    // === NUEVA FUNCIONALIDAD: OCULTAR/MOSTRAR NAVEGACIÓN AL HACER SCROLL ===
    // =========================================================
    let lastScrollTop = 0;
    // Umbral de scroll (cuántos píxeles bajar antes de empezar a ocultar)
    const scrollThreshold = 100; 

    function handleScroll() {
        // Asegúrate de que la navegación exista y la pantalla de inicio haya desaparecido
        if (!mainNav || splashScreen.style.display !== 'none') return;
        
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Solo empezamos a ocultar/mostrar si hemos pasado el umbral inicial
        if (currentScrollTop > scrollThreshold) { 
            if (currentScrollTop > lastScrollTop) {
                // Bajando: Ocultar barra de navegación
                mainNav.classList.add('nav-hidden');
            } else if (currentScrollTop < lastScrollTop) {
                // Subiendo: Mostrar barra de navegación
                mainNav.classList.remove('nav-hidden');
            }
        } else {
            // En la parte superior de la página: siempre visible
            mainNav.classList.remove('nav-hidden');
        }

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // Evita valores negativos
    }
    // =========================================================
});