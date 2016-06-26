microEditor.plugins.register('bold', function () {
  this.create.button(function () {
    this.register.action('bold')
  })
    .icon('fa fa-bold')
    .highlight('bold')
    .tooltip('Bold')
})
