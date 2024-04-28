class LoginView {
  _login = document.getElementById('login');
  _passwordInput = document.querySelector('.login__userform--password');
  _btnLogin = document.querySelector('.login__userform--btn');
  _userNameEl = document.querySelector('.dashboard__greeting--user');

  successfulLogin(id, username) {
    if (this._passwordInput.value !== id) return;
    this._login.style.transform = 'translateX(-350%)';

    this._userNameEl.innerHTML = '';
    this._userNameEl.insertAdjacentHTML('beforeend', username);

    setTimeout(() => {
      this._login.style.display = 'none';
    }, 1000);
  }

  handlerLogin(handler) {
    this._btnLogin.addEventListener('click', (ev) => {
      ev.preventDefault();
      handler();
    });
  }
}

export default new LoginView();
