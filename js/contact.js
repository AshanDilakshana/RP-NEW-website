// Academic Contact Form Validation & Submission Handler

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('academic-contact-form');
  const alertBox = document.getElementById('contact-alert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showError('name-error', 'Please enter your full name (at least 2 characters).');
        isValid = false;
      } else {
        hideError('name-error');
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        showError('email-error', 'Please enter a valid email address.');
        isValid = false;
      } else {
        hideError('email-error');
      }

      // Validate Subject
      if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
        showError('subject-error', 'Please provide a subject (at least 3 characters).');
        isValid = false;
      } else {
        hideError('subject-error');
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showError('message-error', 'Please enter your message (at least 10 characters).');
        isValid = false;
      } else {
        hideError('message-error');
      }

      if (isValid) {
        // Display transparent demonstration response as required by academic guidelines
        if (alertBox) {
          alertBox.style.display = 'block';
          alertBox.className = 'callout callout-am';
          alertBox.innerHTML = `
            <h4>Academic Demonstration Notice</h4>
            <p>Thank you, <strong>${escapeHtml(nameInput.value.trim())}</strong>. Your inputs have been validated successfully. Since this is an academic research information site without an external mail server, you can also send this inquiry directly via email to the research team: <a href="mailto:it22113986@my.sliit.lk?subject=${encodeURIComponent(subjectInput.value.trim())}&body=${encodeURIComponent(messageInput.value.trim())}"><strong>Send via Mail Client →</strong></a></p>
          `;
          contactForm.reset();
        }
      }
    });
  }

  function showError(id, message) {
    const errorEl = document.getElementById(id);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  }

  function hideError(id) {
    const errorEl = document.getElementById(id);
    if (errorEl) {
      errorEl.style.display = 'none';
    }
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
});
