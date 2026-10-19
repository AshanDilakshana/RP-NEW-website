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
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const subject = subjectInput.value.trim();
        const message = messageInput.value.trim();

        const primaryRecipient = 'it22113986@my.sliit.lk';
        const ccRecipients = 'it22269720@my.sliit.lk,it22619976@my.sliit.lk,it22069504@my.sliit.lk';

        const emailSubject = encodeURIComponent(`[R26-IT-132 Inquiry] ${subject}`);
        const emailBody = encodeURIComponent(
          `Full Name: ${name}\n` +
          `Sender Email: ${email}\n` +
          `Subject: ${subject}\n\n` +
          `Message:\n${message}\n\n` +
          `---\nSent via SLIIT Research Project R26-IT-132 Academic Portal`
        );

        const mailtoUrl = `mailto:${primaryRecipient}?cc=${encodeURIComponent(ccRecipients)}&subject=${emailSubject}&body=${emailBody}`;

        // Immediately trigger the user's default email client / mailbox
        window.location.href = mailtoUrl;

        // Display transparent status notice with manual link fallback
        if (alertBox) {
          alertBox.style.display = 'block';
          alertBox.className = 'callout callout-am';
          alertBox.innerHTML = `
            <h4>Opening Email Client...</h4>
            <p>Thank you, <strong>${escapeHtml(name)}</strong>! Your default email client (Outlook, Apple Mail, Gmail, etc.) is opening with your message details pre-filled.</p>
            <p style="margin-top: 8px; font-size: 13.5px;">If your mailbox did not open automatically, please <a href="${mailtoUrl}"><strong>click here to open your mail client →</strong></a></p>
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
