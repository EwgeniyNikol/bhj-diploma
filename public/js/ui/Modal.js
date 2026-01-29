// /**
//  * Класс Modal отвечает за
//  * управление всплывающими окнами.
//  * В первую очередь это открытие или
//  * закрытие имеющихся окон
//  * */
// class Modal {
//   /**
//    * Устанавливает текущий элемент в свойство element
//    * Регистрирует обработчики событий с помощью Modal.registerEvents()
//    * Если переданный элемент не существует,
//    * необходимо выкинуть ошибку.
//    * */
//   constructor(element){

//   }

//   /**
//    * При нажатии на элемент с data-dismiss="modal"
//    * должен закрыть текущее окно
//    * (с помощью метода Modal.onClose)
//    * */
//   registerEvents() {

//   }

//   /**
//    * Срабатывает после нажатия на элементы, закрывающие окно.
//    * Закрывает текущее окно (Modal.close())
//    * */
//   onClose(e) {

//   }
//   /**
//    * Открывает окно: устанавливает CSS-свойство display
//    * со значением «block»
//    * */
//   open() {

//   }
//   /**
//    * Закрывает окно: удаляет CSS-свойство display
//    * */
//   close(){

//   }
// }

class Modal {
  constructor(element) {
    if (!element) {
      throw new Error('Element must be provided to Modal constructor');
    }
    
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    const closeButtons = this.element.querySelectorAll('[data-dismiss="modal"]');
    
    closeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        this.onClose(e);
      });
    });
  }

  onClose(e) {
    e.preventDefault();
    this.close();
  }

  open() {
    this.element.style.display = 'block';
  }

  close() {
    this.element.style.removeProperty('display');
  }
}