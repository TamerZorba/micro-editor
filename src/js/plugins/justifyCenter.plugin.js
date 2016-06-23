microEditor.plugins.register('justifyCenter', function () {
  this.create.button(function () {
    this.register.action('justifyCenter')
  })
    .icon('fa fa-align-center')
    .highlight('justifycenter')
})
