microEditor.plugins.register('redo', function () {
  this.create.button(function () {
    this.register.action('redo')
  })
    .icon('fa fa-repeat')
    .tooltip('Redo')
})
