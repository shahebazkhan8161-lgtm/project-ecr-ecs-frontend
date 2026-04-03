const API = window.API_URL || 'http://localhost:3000';

function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
}

function setMsg(id, text, type) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.className = 'msg ' + type;
}

async function login() {
  const email    = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  try {
    const res  = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user',  JSON.stringify(data.user));
      document.getElementById('logout-btn').style.display = 'inline';
      document.getElementById('welcome-msg').textContent  = `Welcome, ${data.user.name}!`;
      showPage('dashboard');
    } else {
      setMsg('login-msg', data.message || 'Login failed', 'error');
    }
  } catch {
    setMsg('login-msg', 'Cannot connect to server', 'error');
  }
}

async function register() {
  const name     = document.getElementById('reg-name').value;
  const email    = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  try {
    const res  = await fetch(`${API}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (res.ok) {
      setMsg('reg-msg', 'Registered! Please login.', 'success');
      setTimeout(() => showPage('login'), 1200);
    } else {
      setMsg('reg-msg', data.message || 'Registration failed', 'error');
    }
  } catch {
    setMsg('reg-msg', 'Cannot connect to server', 'error');
  }
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  document.getElementById('logout-btn').style.display = 'none';
  showPage('login');
}

if (localStorage.getItem('token')) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  document.getElementById('welcome-msg').textContent  = `Welcome, ${user.name || 'User'}!`;
  document.getElementById('logout-btn').style.display = 'inline';
  showPage('dashboard');
}
