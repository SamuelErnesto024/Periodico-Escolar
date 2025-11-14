// Espera a que todo el HTML esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // 1. Seleccionar todos los botones de navegación
    const navButtons = document.querySelectorAll('.nav-button');
    
    // 2. Seleccionar todas las secciones de contenido
    const contentSections = document.querySelectorAll('.content-section');

    // 3. Añadir un "escuchador de clics" a CADA botón
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            // --- Lógica de los botones ---
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            
            // --- Lógica de las secciones ---
            const targetId = button.dataset.target;

            contentSections.forEach(section => {
                section.classList.remove('active');
            });

            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
});