microEditor.plugins.register('underline', function () {
  this.create.button(function () {
    this.register.action('underline')
  })
    .icon('fa fa-underline')
    .highlight('underline')
    .tooltip('Underline')
})
