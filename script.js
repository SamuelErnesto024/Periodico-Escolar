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
            // Primero, quita la clase 'active' de TODOS los botones
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Luego, añade la clase 'active' SOLO al botón que se presionó
            button.classList.add('active');

            
            // --- Lógica de las secciones ---
            // Obtiene el ID de la sección a mostrar desde el atributo 'data-target' del botón
            const targetId = button.dataset.target; // Ej: "informatica", "hoteleria"

            // Oculta TODAS las secciones
            contentSections.forEach(section => {
                section.classList.remove('active');
            });

            // Muestra SOLAMENTE la sección correspondiente
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
});