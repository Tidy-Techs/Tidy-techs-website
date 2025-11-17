// Mobile menu toggle + close on outside click + close on nav link click
const toggle = document.getElementById('mobile-menu-toggle');
const mobileNav = document.getElementById('mobile-nav');

if(toggle && mobileNav){
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mobileNav.style.display === 'block';
    mobileNav.style.display = isOpen ? 'none' : 'block';
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if(!mobileNav.contains(e.target) && e.target !== toggle){
      mobileNav.style.display = 'none';
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Close when clicking any mobile nav link
  document.querySelectorAll('#mobile-nav .mobile-link').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.style.display = 'none';
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Back button handling: when user presses back, ensure they land at home anchor
window.onpopstate = function(){
  window.location.hash = "#home";
};

// Contact form submission via Web3Forms (AJAX)
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('form-msg');

if(contactForm && formMsg){
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    formMsg.style.color = 'black';
    formMsg.textContent = 'Sending...';

    const formData = new FormData(contactForm);

    // ensure access_key present (also present as hidden input)
    if(!formData.get('access_key')){
      formData.append('access_key', 'f3dcdb82-b602-42f1-be7f-48961e9c1189');
    }

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if(data && data.success){
        // if a redirect field is provided in the form, follow it; otherwise show message
        const redirect = contactForm.querySelector('input[name="redirect"]')?.value;
        if(redirect){
          // give users a tiny delay to read message then redirect
          formMsg.style.color = 'green';
          formMsg.textContent = 'Message sent! Redirecting...';
          setTimeout(()=>{ window.location.href = redirect; }, 700);
        } else {
          formMsg.style.color = 'green';
          formMsg.textContent = data.message || 'Message sent successfully!';
          contactForm.reset();
        }
      } else {
        formMsg.style.color = 'red';
        formMsg.textContent = data?.message || 'Failed to send message. Try again later.';
      }
    })
    .catch(err => {
      console.error('Form error:', err);
      formMsg.style.color = 'red';
      formMsg.textContent = 'An error occurred. Please try again later.';
    });
  });
}



