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