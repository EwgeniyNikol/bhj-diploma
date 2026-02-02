class UserWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Element must be provided to UserWidget constructor');
    }
    
    this.element = element;
  }

  update() {
    const currentUser = User.current();
    const userNameElement = this.element.querySelector('.user-name');
    
    if (currentUser && userNameElement) {
      userNameElement.textContent = currentUser.name;
    }
  }
}