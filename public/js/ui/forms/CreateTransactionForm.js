// /**
//  * Класс CreateTransactionForm управляет формой
//  * создания новой транзакции
//  * */
// class CreateTransactionForm extends AsyncForm {
//   /**
//    * Вызывает родительский конструктор и
//    * метод renderAccountsList
//    * */
//   constructor(element) {
//     super(element)
//   }

//   /**
//    * Получает список счетов с помощью Account.list
//    * Обновляет в форме всплывающего окна выпадающий список
//    * */
//   renderAccountsList() {

//   }

//   /**
//    * Создаёт новую транзакцию (доход или расход)
//    * с помощью Transaction.create. По успешному результату
//    * вызывает App.update(), сбрасывает форму и закрывает окно,
//    * в котором находится форма
//    * */
//   onSubmit(data) {

//   }
// }

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