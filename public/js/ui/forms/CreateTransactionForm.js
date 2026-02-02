class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  renderAccountsList() {
    const selectElement = this.element.querySelector('.accounts-select');
    
    if (!selectElement) {
      return;
    }
    
    Account.list({}, (err, response) => {
      if (response && response.data) {
        selectElement.innerHTML = '';
        
        response.data.forEach(account => {
          const option = document.createElement('option');
          option.value = account.id;
          option.textContent = account.name;
          selectElement.appendChild(option);
        });
      }
    });
  }

  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        const modalType = data.type === 'income' ? 'newIncome' : 'newExpense';
        const modal = App.getModal(modalType);
        
        if (modal) {
          modal.close();
        }
        
        this.element.reset();
        App.update();
      }
    });
  }
}