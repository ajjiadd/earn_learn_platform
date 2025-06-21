document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('auth-form');
    const title = document.getElementById('form-title');
    const toggleLink = document.getElementById('toggle-link');
    const nameField = document.getElementById('name-field');
    const phoneField = document.getElementById('phone-field');
    let isLogin = true;
  
    toggleLink.addEventListener('click', (e) => {
      e.preventDefault();
      isLogin = !isLogin;
      title.textContent = isLogin ? 'Login' : 'Sign Up';
      toggleLink.textContent = isLogin ? 'Need an account? Sign up' : 'Already have an account? Login';
      nameField.classList.toggle('hidden', isLogin);
      phoneField.classList.toggle('hidden', isLogin);
    });
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      const url = isLogin ? '/auth/login' : '/auth/signup';
      const data = isLogin
        ? { email, password }
        : {
            name: document.getElementById('name').value,
            email,
            phone: document.getElementById('phone').value,
            password,
          };
  
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await response.json();
        alert(result.message);
        if (result.redirect) {
          window.location.href = result.redirect;
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
      }
    });
  });