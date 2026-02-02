class AccountsWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Element must be provided to AccountsWidget constructor');
    }
    
    this.element = element;
    this.registerEvents();
    this.update();
  }

  registerEvents() {
    const createAccountBtn = this.element.querySelector('.create-account');
    if (createAccountBtn) {
      createAccountBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const modal = App.getModal('createAccount');
        if (modal) {
          modal.open();
        }
      });
    }
    
    this.element.addEventListener('click', (event) => {
      event.preventDefault();
      
      const accountElement = event.target.closest('.account');
      if (accountElement) {
        this.onSelectAccount(accountElement);
      }
    });
  }

  update() {
    if (!User.current()) {
      return;
    }
    
    Account.list({}, (err, response) => {
      if (response && response.data) {
        this.clear();
        
        response.data.forEach(account => {
          this.renderItem(account);
        });
      }
    });
  }

  clear() {
    const accountElements = this.element.querySelectorAll('.account');
    accountElements.forEach(element => {
      element.remove();
    });
  }

  onSelectAccount(element) {
    const activeElements = this.element.querySelectorAll('.account.active');
    activeElements.forEach(el => {
      el.classList.remove('active');
    });
    
    element.classList.add('active');
    
    const accountId = element.getAttribute('data-id');
    if (accountId) {
      App.showPage('transactions', { account_id: accountId });
    }
  }

  getAccountHTML(item) {
    const formattedSum = item.sum ? item.sum.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : '0.00';
    
    return `
      <li class="account" data-id="${item.id}">
        <a href="#">
          <span>${item.name}</span> / 
          <span>${formattedSum} ₽</span>
        </a>
      </li>
    `;
  }

  renderItem(data) {
    const html = this.getAccountHTML(data);
    this.element.insertAdjacentHTML('beforeend', html);
  }
}