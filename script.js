/*
  script.js
  Maneja interacciones básicas del portfolio: apertura de tarjetas de experiencia,
  actualización del año en el footer y otras utilidades.
*/

document.addEventListener('DOMContentLoaded', () => {
  // Cambiar el año en el footer dinámicamente
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Añadir manejadores a los botones de detalle con animación suave
  const toggleButtons = document.querySelectorAll('.exp-card .toggle-btn');
  toggleButtons.forEach(btn => {
    // Definir textos predeterminados según el idioma si no existen
    if (!btn.dataset.showText) {
      // El texto de mostrar será el texto actual del botón (e.g. "Detalles" o "Details")
      btn.dataset.showText = btn.textContent.trim();
    }
    if (!btn.dataset.hideText) {
      // El texto de ocultar depende del idioma del botón
      const lower = btn.dataset.showText.toLowerCase();
      // Si contiene "detall", asumimos español
      btn.dataset.hideText = lower.includes('detal') ? 'Ocultar' : 'Hide';
    }
    btn.addEventListener('click', () => {
      const card = btn.closest('.exp-card');
      const cardDetails = card.querySelector('.card-details');
      const isActive = cardDetails.classList.contains('active');
      if (isActive) {
        // Colapsar: eliminar clase activa
        cardDetails.classList.remove('active');
        card.classList.remove('open');
        btn.textContent = btn.dataset.showText;
      } else {
        // Expandir: añadir clase activa
        cardDetails.classList.add('active');
        card.classList.add('open');
        btn.textContent = btn.dataset.hideText;
      }
    });
  });

  // Permitir expandir/ocultar haciendo click en cualquier lugar de la tarjeta
  const cards = document.querySelectorAll('.exp-card');
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Si se hace clic en el botón de detalles, permitimos que el propio manejador lo gestione
      if (e.target.closest('.toggle-btn')) return;
      // Evitar que hacer clic dentro de los detalles vuelva a colapsar/expandir
      if (e.target.closest('.card-details')) return;
      const btn = card.querySelector('.toggle-btn');
      if (btn) {
        // Simular un clic en el botón para reutilizar la lógica existente
        btn.click();
      }
    });
  });

  // Eliminar marcas de citación (【…†screenshot】) de los textos visibles
  const cleanSelectors = document.querySelectorAll('p, li, .timeline-content');
  cleanSelectors.forEach(el => {
    el.innerHTML = el.innerHTML.replace(/【[^】]+】/g, '');
  });

  // Envío de correo desde el formulario de contacto
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const subject = encodeURIComponent('Mensaje de contacto de ' + name);
      const body = encodeURIComponent('Nombre: ' + name + '\nEmail: ' + email + '\n\n' + message);
      window.location.href = `mailto:frugonizavalaignacio@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});