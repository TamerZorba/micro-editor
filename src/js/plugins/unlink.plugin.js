microEditor.plugins.register('unlink', function () {
  this.create.button(function () {
    this.register.action('unlink')
  }).icon('fa fa-unlink')
})
