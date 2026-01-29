// /**
//  * Класс TransactionsPage управляет
//  * страницей отображения доходов и
//  * расходов конкретного счёта
//  * */
// class TransactionsPage {
//   /**
//    * Если переданный элемент не существует,
//    * необходимо выкинуть ошибку.
//    * Сохраняет переданный элемент и регистрирует события
//    * через registerEvents()
//    * */
//   constructor( element ) {

//   }

//   /**
//    * Вызывает метод render для отрисовки страницы
//    * */
//   update() {

//   }

//   /**
//    * Отслеживает нажатие на кнопку удаления транзакции
//    * и удаления самого счёта. Внутри обработчика пользуйтесь
//    * методами TransactionsPage.removeTransaction и
//    * TransactionsPage.removeAccount соответственно
//    * */
//   registerEvents() {

//   }

//   /**
//    * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
//    * Если пользователь согласен удалить счёт, вызовите
//    * Account.remove, а также TransactionsPage.clear с
//    * пустыми данными для того, чтобы очистить страницу.
//    * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
//    * либо обновляйте только виджет со счетами и формы создания дохода и расхода
//    * для обновления приложения
//    * */
//   removeAccount() {

//   }

//   /**
//    * Удаляет транзакцию (доход или расход). Требует
//    * подтверждеия действия (с помощью confirm()).
//    * По удалению транзакции вызовите метод App.update(),
//    * либо обновляйте текущую страницу (метод update) и виджет со счетами
//    * */
//   removeTransaction( id ) {

//   }

//   /**
//    * С помощью Account.get() получает название счёта и отображает
//    * его через TransactionsPage.renderTitle.
//    * Получает список Transaction.list и полученные данные передаёт
//    * в TransactionsPage.renderTransactions()
//    * */
//   render(options){

//   }

//   /**
//    * Очищает страницу. Вызывает
//    * TransactionsPage.renderTransactions() с пустым массивом.
//    * Устанавливает заголовок: «Название счёта»
//    * */
//   clear() {

//   }

//   /**
//    * Устанавливает заголовок в элемент .content-title
//    * */
//   renderTitle(name){

//   }

//   /**
//    * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
//    * в формат «10 марта 2019 г. в 03:20»
//    * */
//   formatDate(date){

//   }

//   /**
//    * Формирует HTML-код транзакции (дохода или расхода).
//    * item - объект с информацией о транзакции
//    * */
//   getTransactionHTML(item){

//   }

//   /**
//    * Отрисовывает список транзакций на странице
//    * используя getTransactionHTML
//    * */
//   renderTransactions(data){

//   }
// }

class TransactionsPage {
  constructor(element) {
    if (!element) {
      throw new Error('Element must be provided to TransactionsPage constructor');
    }
    
    this.element = element;
    this.lastOptions = null;
    this.registerEvents();
  }

  update() {
    if (this.lastOptions) {
      this.render(this.lastOptions);
    }
  }

  registerEvents() {
    this.element.addEventListener('click', (event) => {
      const removeAccountBtn = event.target.closest('.remove-account');
      if (removeAccountBtn) {
        event.preventDefault();
        this.removeAccount();
      }
      
      const removeTransactionBtn = event.target.closest('.transaction__remove');
      if (removeTransactionBtn) {
        event.preventDefault();
        const transactionId = removeTransactionBtn.getAttribute('data-id');
        if (transactionId) {
          this.removeTransaction(transactionId);
        }
      }
    });
  }

  removeAccount() {
    if (!this.lastOptions || !this.lastOptions.account_id) {
      return;
    }
    
    if (!confirm('Вы действительно хотите удалить счёт?')) {
      return;
    }
    
    Account.remove({ id: this.lastOptions.account_id }, (err, response) => {
      if (response && response.success) {
        this.clear();
        App.updateWidgets();
        App.updateForms();
      }
    });
  }

  removeTransaction(id) {
    if (!confirm('Вы действительно хотите удалить эту транзакцию?')) {
      return;
    }
    
    Transaction.remove({ id: id }, (err, response) => {
      if (response && response.success) {
        this.update();
      }
    });
  }

  render(options) {
    if (!options || !options.account_id) {
      return;
    }
    
    this.lastOptions = options;
    
    Account.get(options.account_id, (err, response) => {
      if (response && response.success) {
        this.renderTitle(response.data.name);
      }
    });
    
    Transaction.list({ account_id: options.account_id }, (err, response) => {
      if (response && response.success) {
        this.renderTransactions(response.data);
      }
    });
  }

  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
    this.lastOptions = null;
  }

  renderTitle(name) {
    const titleElement = this.element.querySelector('.content-title');
    if (titleElement) {
      titleElement.textContent = name;
    }
  }

  formatDate(date) {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('ru', { month: 'long' });
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    
    return `${day} ${month} ${year} г. в ${hours}:${minutes}`;
  }

  getTransactionHTML(item) {
    const formattedDate = this.formatDate(item.created_at);
    const formattedSum = item.sum.toFixed(2);
    const typeClass = item.type === 'income' ? 'transaction_income' : 'transaction_expense';
    
    return `
      <div class="transaction ${typeClass} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <div class="transaction__date">${formattedDate}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
            ${formattedSum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  }

  renderTransactions(data) {
    const contentSection = this.element.querySelector('.content');
    
    if (!contentSection) {
      return;
    }
    
    contentSection.innerHTML = '';
    
    if (!data || data.length === 0) {
      contentSection.innerHTML = '<p>Нет транзакций</p>';
      return;
    }
    
    data.forEach(transaction => {
      const html = this.getTransactionHTML(transaction);
      contentSection.insertAdjacentHTML('beforeend', html);
    });
  }
}