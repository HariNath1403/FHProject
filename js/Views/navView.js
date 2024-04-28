import Forms from './forms.js';

class NavView extends Forms {
  displayNavigation() {
    this._navigation.style.transform = 'translateX(-67.5%)';
    this._navigation.style.opacity = 1;
    this._navigation.style.pointerEvents = 'all';
  }

  hideNavigation() {
    this._navigation.style.transform = 'translateX(-167.5%)';
    this._navigation.style.opacity = 0;
    this._navigation.style.pointerEvents = 'none';
  }

  handlerDisplayNavigation(handler) {
    this._btnHamburger.addEventListener('click', handler);
  }

  handlerCloseNavigation(handler) {
    this._btnNavExit.addEventListener('click', handler);
  }
}

export default new NavView();
