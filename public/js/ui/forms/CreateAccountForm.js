// /**
//  * Класс CreateAccountForm управляет формой
//  * создания нового счёта
//  * */
// class CreateAccountForm extends AsyncForm {
//   /**
//    * Создаёт счёт с помощью Account.create и закрывает
//    * окно в случае успеха, а также вызывает App.update()
//    * и сбрасывает форму
//    * */
//   onSubmit(data) {

//   }
// }

class CreateAccountForm extends AsyncForm {
  onSubmit(data) {
    Account.create(data, (err, response) => {
      if (response && response.success) {
        const modal = App.getModal('createAccount');
        if (modal) {
          modal.close();
        }
        
        this.element.reset();
        App.update();
      }
    });
  }
}