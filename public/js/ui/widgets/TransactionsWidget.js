class TransactionsWidget {
  constructor(element) {
    if (!element) {
      throw new Error('Element must be provided to TransactionsWidget constructor');
    }
    
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    const incomeButton = this.element.querySelector('.create-income-button');
    const expenseButton = this.element.querySelector('.create-expense-button');
    
    if (incomeButton) {
      incomeButton.addEventListener('click', (event) => {
        event.preventDefault();
        const modal = App.getModal('newIncome');
        if (modal) {
          modal.open();
        }
      });
    }
    
    if (expenseButton) {
      expenseButton.addEventListener('click', (event) => {
        event.preventDefault();
        const modal = App.getModal('newExpense');
        if (modal) {
          modal.open();
        }
      });
    }
  }
}