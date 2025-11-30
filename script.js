document.addEventListener('DOMContentLoaded', () => {
    // LÓGICA DE PANTALLA DE BIENVENIDA (SPLASH SCREEN)
    const splashScreen = document.getElementById('splash-screen');
    const enterButton = document.getElementById('enter-button');
    const mainHeader = document.querySelector('.main-header');
    const mainNav = document.querySelector('.main-nav');
    const contentArea = document.querySelector('.content-area');
    const mainFooter = document.querySelector('.main-footer');
    // NUEVOS ELEMENTOS
    const floatingNavContainer = document.getElementById('floating-nav-container'); 
    const navButtons = document.querySelectorAll('.nav-button');
    const contentSections = document.querySelectorAll('.content-section');
    const navToggleButton = document.getElementById('nav-toggle-button');
    const floatingNavButtonsContainer = document.getElementById('floating-nav-buttons');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    // =========================================================
    // === LÓGICA DE MODO OSCURO: CARGA INICIAL ===
    // =========================================================
    // Cargar la preferencia del usuario (si existe)
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '🌙'; // Icono de luna
    } else {
        darkModeToggle.textContent = '☀️'; // Icono de sol
    }
    
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
            // mainNav.style.display ya no es necesario, CSS lo maneja, pero lo dejamos si es necesario para compatibilidad en algunos navegadores
            mainNav.style.display = 'block'; 
            contentArea.style.display = 'block';
            mainFooter.style.display = 'block';
            
            // *** MOSTRAR CONTENEDOR FLOTANTE Y GENERAR BOTONES (NUEVO) ***
            if (floatingNavContainer) {
                floatingNavContainer.style.display = 'block';
                generateFloatingNavButtons();
            }
            
            // *** INICIAR ESCUCHA DE SCROLL DESPUÉS DE ENTRAR ***
            if (mainNav) {
                // Ya no necesitamos la función handleScroll si el CSS oculta la barra, pero la dejamos por si acaso.
                window.addEventListener('scroll', handleScroll); 
            }
        }, 500); // 500ms para que termine la transición CSS
    });

    // =========================================================
    // === LÓGICA DE NAVEGACIÓN POR BOTONES (CENTRALIZADA) ===
    // =========================================================
    
    // Función centralizada para manejar la activación de secciones y botones
    function activateSection(targetId) {
        // 1. Desactivar todos los botones de ambos menús
        document.querySelectorAll('.nav-button').forEach(btn => btn.classList.remove('active'));

        contentSections.forEach(section => section.classList.remove('active'));

        // 2. Activar el botón clicado (en ambas barras si existen)
        document.querySelectorAll(`.nav-button[data-target="${targetId}"]`).forEach(btn => {
            btn.classList.add('active');
        });

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Al hacer click, sube al principio para que la navegación esté visible
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Listener para los botones de la navegación principal (Aunque esté oculta, se activa si se hace visible por algún error)
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            activateSection(targetId);
        });
    });


    // =========================================================
    // === FUNCIONALIDAD: LÓGICA DE MENÚ FLOTANTE ===
    // =========================================================

    // Muestra/Oculta el menú flotante
    if (navToggleButton) {
        navToggleButton.addEventListener('click', () => {
            floatingNavContainer.classList.toggle('open');
            navToggleButton.textContent = floatingNavContainer.classList.contains('open') ? '✕' : '☰';
        });
    }

    // Genera los botones de la navegación flotante
    function generateFloatingNavButtons() {
        if (!floatingNavButtonsContainer) return;
        floatingNavButtonsContainer.innerHTML = ''; // Limpiar antes de generar
        
        // Usamos los botones de la barra principal como plantilla
        navButtons.forEach(originalButton => {
            const targetId = originalButton.getAttribute('data-target');
            
            // Crear una copia del botón
            const floatingButton = originalButton.cloneNode(true);
            
            // Reemplazar el listener
            floatingButton.removeEventListener('click', () => {}); 

            floatingButton.addEventListener('click', () => {
                activateSection(targetId); // Usar la función centralizada
                floatingNavContainer.classList.remove('open'); // Cerrar el menú después de seleccionar
                navToggleButton.textContent = '☰';
            });
            
            // Limpiar clases específicas de la barra principal
            if(floatingButton.classList.contains('highlight')) {
                 floatingButton.classList.remove('highlight');
                 // Mantener un estilo base, si lo desea, se puede personalizar más en CSS
                 floatingButton.style.backgroundColor = 'var(--accent-color)'; 
            }

            floatingNavButtonsContainer.appendChild(floatingButton);
        });
    }

    // =========================================================
    // === FUNCIONALIDAD: MODO OSCURO (DARK MODE) ===
    // =========================================================
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');

            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
                darkModeToggle.textContent = '🌙';
            } else {
                localStorage.setItem('darkMode', 'disabled');
                darkModeToggle.textContent = '☀️';
            }
        });
    }


    // =========================================================
    // === LÓGICA DE OCULTAR/MOSTRAR NAVEGACIÓN AL HACER SCROLL (YA NO NECESARIA POR CSS, PERO LA MANTENEMOS) ===
    // =========================================================
    let lastScrollTop = 0;
    // Umbral de scroll 
    const scrollThreshold = 100; 

    function handleScroll() {
        if (!mainNav || splashScreen.style.display !== 'none') return;
        
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScrollTop > scrollThreshold) { 
            if (currentScrollTop > lastScrollTop) {
                // Bajando: Ocultar barra de navegación
                // mainNav.classList.add('nav-hidden'); // No es necesaria si el CSS oculta la barra
            } else if (currentScrollTop < lastScrollTop) {
                // Subiendo: Mostrar barra de navegación
                // mainNav.classList.remove('nav-hidden'); // No es necesaria si el CSS oculta la barra
            }
        } else {
            // En la parte superior de la página: siempre visible
            // mainNav.classList.remove('nav-hidden'); // No es necesaria si el CSS oculta la barra
        }

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; 
    }
    // =========================================================
});