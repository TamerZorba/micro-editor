microEditor.plugins.register('removeFormat', function () {
  this.create.button(function () {
    this.register.action('removeFormat')
  })
    .icon('fa fa-eraser')
    .tooltip('Remove Format')
})
