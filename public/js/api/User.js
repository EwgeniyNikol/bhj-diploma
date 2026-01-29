/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
// class User {
//   /**
//    * Устанавливает текущего пользователя в
//    * локальном хранилище.
//    * */
//   static setCurrent(user) {

//   }

//   /**
//    * Удаляет информацию об авторизованном
//    * пользователе из локального хранилища.
//    * */
//   static unsetCurrent() {

//   }

//   /**
//    * Возвращает текущего авторизованного пользователя
//    * из локального хранилища
//    * */
//   static current() {

//   }

//   /**
//    * Получает информацию о текущем
//    * авторизованном пользователе.
//    * */
//   static fetch(callback) {

//   }

//   /**
//    * Производит попытку авторизации.
//    * После успешной авторизации необходимо
//    * сохранить пользователя через метод
//    * User.setCurrent.
//    * */
//   static login(data, callback) {
//     createRequest({
//       url: this.URL + '/login',
//       method: 'POST',
//       responseType: 'json',
//       data,
//       callback: (err, response) => {
//         if (response && response.user) {
//           this.setCurrent(response.user);
//         }
//         callback(err, response);
//       }
//     });
//   }

//   /**
//    * Производит попытку регистрации пользователя.
//    * После успешной авторизации необходимо
//    * сохранить пользователя через метод
//    * User.setCurrent.
//    * */
//   static register(data, callback) {

//   }

//   /**
//    * Производит выход из приложения. После успешного
//    * выхода необходимо вызвать метод User.unsetCurrent
//    * */
//   static logout(callback) {

//   }
// }

class User {
  static URL = '/user';

  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  static current() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : undefined;
  }

  static fetch(callback) {
  createRequest({
    url: this.URL + '/current',
    method: 'GET',
    responseType: 'json',
    callback: (err, response) => {
      if (response && response.success && response.user) {
        this.setCurrent(response.user);
      } else {
        this.unsetCurrent();
      }
      callback(err, response);
    }
  });
}

  static login(data, callback) {
    createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.success && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  static register(data, callback) {
    createRequest({
      url: this.URL + '/register',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.success && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });
  }

  static logout(callback) {
    createRequest({
      url: this.URL + '/logout',
      method: 'POST',
      responseType: 'json',
      callback: (err, response) => {
        if (response && response.success) {
          this.unsetCurrent();
        }
        callback(err, response);
      }
    });
  }
}