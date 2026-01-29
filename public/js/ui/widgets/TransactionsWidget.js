/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

// class TransactionsWidget {
//   /**
//    * Устанавливает полученный элемент
//    * в свойство element.
//    * Если переданный элемент не существует,
//    * необходимо выкинуть ошибку.
//    * */
//   constructor( element ) {

//   }
//   /**
//    * Регистрирует обработчики нажатия на
//    * кнопки «Новый доход» и «Новый расход».
//    * При нажатии вызывает Modal.open() для
//    * экземпляра окна
//    * */
//   registerEvents() {

//   }
// }

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