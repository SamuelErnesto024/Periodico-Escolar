document.addEventListener('DOMContentLoaded', () => {
    // 1. Lógica del Splash Screen
    const splashScreen = document.getElementById('splash-screen');
    const enterButton = document.getElementById('enter-button');
    const body = document.body;

    // Ocultar el scroll de la página principal mientras el splash está activo
    // (Importante para evitar que el usuario scrollee antes de entrar)
    body.style.overflow = 'hidden';

    enterButton.addEventListener('click', () => {
        // Iniciar la animación de salida (CSS: opacity 0)
        splashScreen.style.opacity = '0';
        
        // Mostrar el scroll y la página principal después de la transición
        setTimeout(() => {
            splashScreen.style.display = 'none';
            body.style.overflow = 'visible';
        }, 800); // El tiempo (800ms) debe coincidir con la transición de opacidad en style.css
    });


    // 2. Lógica de Navegación (Funcionalidad de los botones)
    const navButtons = document.querySelectorAll('.nav-button');
    const contentSections = document.querySelectorAll('.content-section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const targetId = button.dataset.target;
            contentSections.forEach(section => {
                section.classList.remove('active');
            });

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});