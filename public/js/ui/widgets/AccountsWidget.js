// /**
//  * Класс AccountsWidget управляет блоком
//  * отображения счетов в боковой колонке
//  * */

// class AccountsWidget {
//   /**
//    * Устанавливает текущий элемент в свойство element
//    * Регистрирует обработчики событий с помощью
//    * AccountsWidget.registerEvents()
//    * Вызывает AccountsWidget.update() для получения
//    * списка счетов и последующего отображения
//    * Если переданный элемент не существует,
//    * необходимо выкинуть ошибку.
//    * */
//   constructor( element ) {

//   }

//   /**
//    * При нажатии на .create-account открывает окно
//    * #modal-new-account для создания нового счёта
//    * При нажатии на один из существующих счетов
//    * (которые отображены в боковой колонке),
//    * вызывает AccountsWidget.onSelectAccount()
//    * */
//   registerEvents() {

//   }

//   /**
//    * Метод доступен только авторизованным пользователям
//    * (User.current()).
//    * Если пользователь авторизован, необходимо
//    * получить список счетов через Account.list(). При
//    * успешном ответе необходимо очистить список ранее
//    * отображённых счетов через AccountsWidget.clear().
//    * Отображает список полученных счетов с помощью
//    * метода renderItem()
//    * */
//   update() {

//   }

//   /**
//    * Очищает список ранее отображённых счетов.
//    * Для этого необходимо удалять все элементы .account
//    * в боковой колонке
//    * */
//   clear() {

//   }

//   /**
//    * Срабатывает в момент выбора счёта
//    * Устанавливает текущему выбранному элементу счёта
//    * класс .active. Удаляет ранее выбранному элементу
//    * счёта класс .active.
//    * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
//    * */
//   onSelectAccount( element ) {

//   }

//   /**
//    * Возвращает HTML-код счёта для последующего
//    * отображения в боковой колонке.
//    * item - объект с данными о счёте
//    * */
//   getAccountHTML(item){

//   }

//   /**
//    * Получает массив с информацией о счетах.
//    * Отображает полученный с помощью метода
//    * AccountsWidget.getAccountHTML HTML-код элемента
//    * и добавляет его внутрь элемента виджета
//    * */
//   renderItem(data){

//   }
// }

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