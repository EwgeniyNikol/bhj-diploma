class AsyncForm {
  constructor(element) {
    if (!element) throw new Error('Element must be provided to AsyncForm constructor');
    this.element = element;
    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submit();
    });
  }

  getData() {
    const formData = new FormData(this.element);
    return Object.fromEntries(formData.entries());
  }

  onSubmit(options) {
    throw new Error('Method onSubmit must be implemented in child class');
  }

  submit() {
    this.onSubmit(this.getData());
  }
}