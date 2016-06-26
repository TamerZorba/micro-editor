microEditor.plugins.register('subscript', function () {
  this.create.button(function () {
    this.register.action('subscript')
  })
    .icon('fa fa-subscript')
    .highlight('subscript')
    .tooltip('Subscript')
})
