microEditor.plugins.register('indent', function () {
  this.create.button(function () {
    this.register.action('indent')
  })
    .icon('fa fa-indent')
    .highlight('indent')
})
