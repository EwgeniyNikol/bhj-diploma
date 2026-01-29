// /**
//  * Класс AsyncForm управляет всеми формами
//  * приложения, которые не должны быть отправлены с
//  * перезагрузкой страницы. Вместо этого данные
//  * с таких форм собираются и передаются в метод onSubmit
//  * для последующей обработки
//  * */
// class AsyncForm {
//   /**
//    * Если переданный элемент не существует,
//    * необходимо выкинуть ошибку.
//    * Сохраняет переданный элемент и регистрирует события
//    * через registerEvents()
//    * */
//   constructor(element) {

//   }

//   /**
//    * Необходимо запретить отправку формы и в момент отправки
//    * вызывает метод submit()
//    * */
//   registerEvents() {

//   }

//   /**
//    * Преобразует данные формы в объект вида
//    * {
//    *  'название поля формы 1': 'значение поля формы 1',
//    *  'название поля формы 2': 'значение поля формы 2'
//    * }
//    * */
//   getData() {

//   }

//   onSubmit(options){

//   }

//   /**
//    * Вызывает метод onSubmit и передаёт туда
//    * данные, полученные из метода getData()
//    * */
//   submit() {

//   }
// }

class AsyncForm {
  constructor(element) {
    if (!element) {
      throw new Error('Element must be provided to AsyncForm constructor');
    }
    
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('submit', (event) => {
      event.preventDefault();
      this.submit();
    });
  }

  getData() {
    const formData = new FormData(this.element);
    const data = {};
    
    for (let [name, value] of formData.entries()) {
      data[name] = value;
    }
    
    return data;
  }

  onSubmit(options) {}

  submit() {
    const data = this.getData();
    this.onSubmit(data);
  }
}