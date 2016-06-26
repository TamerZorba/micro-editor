microEditor.plugins.register('insertimage', function () {
  this.create.button(function () {
    this.register.action('insertimage')
  })
    .icon('fa fa-image')
    .tooltip('Insert Image')
})
