microEditor.plugins.register('justifyLeft', function () {
  this.create.button(function () {
    this.register.action('justifyLeft')
  })
    .icon('fa fa-align-left')
    .highlight('justifyleft')
})
