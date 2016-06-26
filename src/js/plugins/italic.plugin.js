microEditor.plugins.register('italic', function () {
  this.create.button(function () {
    this.register.action('italic')
  })
    .icon('fa fa-italic')
    .highlight('italic')
    .tooltip('Italic')
})
