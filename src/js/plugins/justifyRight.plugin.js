microEditor.plugins.register('justifyRight', function () {
  this.create.button(function () {
    this.register.action('justifyRight')
  })
    .icon('fa fa-align-right')
    .highlight('justifyright')
})
