class Sidebar {
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    const toggleButton = document.querySelector('.sidebar-toggle');
    
    if (toggleButton) {
      toggleButton.addEventListener('click', (event) => {
        event.preventDefault();
        document.body.classList.toggle('sidebar-open');
        document.body.classList.toggle('sidebar-collapse');
      });
    }
  }

  static initAuthLinks() {
    const loginButton = document.querySelector('.menu-item_login a');
    const registerButton = document.querySelector('.menu-item_register a');
    const logoutButton = document.querySelector('.menu-item_logout a');
    
    if (loginButton) {
      loginButton.addEventListener('click', (event) => {
        event.preventDefault();
        const loginModal = App.getModal('login');
        if (loginModal) {
          loginModal.open();
        }
      });
    }
    
    if (registerButton) {
      registerButton.addEventListener('click', (event) => {
        event.preventDefault();
        const registerModal = App.getModal('register');
        if (registerModal) {
          registerModal.open();
        }
      });
    }
    
    if (logoutButton) {
      logoutButton.addEventListener('click', (event) => {
        event.preventDefault();
        User.logout((err, response) => {
          if (response && response.success) {
            App.setState('init');
          }
        });
      });
    }
  }
}