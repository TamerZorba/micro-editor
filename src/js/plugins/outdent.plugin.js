microEditor.plugins.register('outdent', function () {
  this.create.button(function () {
    this.register.action('outdent')
  })
    .icon('fa fa-outdent')
    .highlight('outdent')
    .tooltip('Outdent')
})
