AutoForm.addHooks(null, {
  onError: function(formType, error) {
    Flash.set(error);
  }
});
