microEditor.plugins.register('print', function () {
  this.create.button(function () {
    this.register.action('print')
  })
    .icon('fa fa-print')
    .tooltip('Print')
})
