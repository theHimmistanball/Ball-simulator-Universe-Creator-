const screens = {
  welcome: document.getElementById('welcome-screen'),
  newPlayer: document.getElementById('new-player-screen'),
  emailForm: document.getElementById('email-form-screen'),
  returningPlayer: document.getElementById('returning-player-screen'),
  success: document.getElementById('success-screen')
};

const messageBox = document.getElementById('new-player-message');
const successTitle = document.getElementById('success-title');
const successMessage = document.getElementById('success-message');

function showScreen(screenName) {
  Object.values(screens).forEach((screen) => screen.classList.add('hidden'));
  screens[screenName].classList.remove('hidden');
}

function setSuccess(title, text) {
  successTitle.textContent = title;
  successMessage.textContent = text;
  showScreen('success');
}

document.querySelectorAll('[data-target]').forEach((button) => {
  button.addEventListener('click', () => {
    showScreen(button.dataset.target);
  });
});

document.querySelectorAll('[data-action]').forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;

    if (action === 'email') {
      showScreen('emailForm');
      messageBox.textContent = '';
    } else if (action === 'guest') {
      setSuccess('Welcome as a guest', 'You can jump in right away and create an account later.');
      messageBox.textContent = 'Guest mode is ready for quick play.';
    } else if (action === 'google') {
      messageBox.textContent = 'Google sign-in will be added soon. You can still create an account with email.';
      showScreen('emailForm');
    }
  });
});

document.getElementById('signup-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const email = formData.get('email');
  const username = formData.get('username');

  if (!email || !username) {
    return;
  }

  setSuccess('Account created', `Welcome, ${username}! Your account is ready to use.`);
  event.target.reset();
});

document.getElementById('login-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const loginId = new FormData(event.target).get('login-id');
  setSuccess('Welcome back', `You are signed in as ${loginId}.`);
  event.target.reset();
});

document.getElementById('start-over').addEventListener('click', () => {
  showScreen('welcome');
  messageBox.textContent = '';
});
