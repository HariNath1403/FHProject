class HomeView {
  _categoryBoxes = document.querySelectorAll('.dashboard__exp--category');

  activateBox(no, activated) {
    const positionToActivate = this.toggleActivation(activated) * no;
    this._categoryBoxes.forEach((box, index) => {
      if (index !== positionToActivate - 1) {
        box.classList.add('hide--display');
      } else {
        box.classList.remove('hide--display');
      }
    });
  }

  toggleActivation(status) {
    if (status) {
      return 1;
    } else {
      return -1;
    }
  }

  handlerActivateBox(handler) {
    this._categoryBoxes.forEach((box) => {
      box.addEventListener('click', () => {
        const no = 1 * box.getAttribute('data-position');
        let activated;

        if (box.classList.contains('hide--display')) {
          activated = true;
        }

        handler(no, activated);
      });
    });
  }
}

export default new HomeView();
