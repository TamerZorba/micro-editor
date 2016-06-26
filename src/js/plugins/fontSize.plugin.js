microEditor.plugins.register('fontSize', function () {
  this.create.button()
    .icon('fa fa-text-height')
    .dropdown(function (e) {
      this.register.action('fontSize', e)
    })
    .tooltip('Font Size')
    .menu(1)
    .menu(2)
    .menu(3)
    .menu(4)
    .menu(5)
    .menu(6)
    .menu(7)
}, function () {
  this.register.toolbar('fontSize')
})
