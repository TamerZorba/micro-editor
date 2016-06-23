microEditor.plugins.register('undo', function () {
  this.create.button(function () {
    this.register.action('undo')
  }).icon('fa fa-undo')
})
