microEditor.plugins.register('superscript', function () {
  this.create.button(function () {
    this.register.action('superscript')
  })
    .icon('fa fa-superscript')
    .highlight('superscript')
    .tooltip('Superscript')
})
