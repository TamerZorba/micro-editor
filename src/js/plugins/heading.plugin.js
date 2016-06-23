microEditor.plugins.register('heading', function () {
  this.create.button()
    .icon('fa fa-paragraph')
    .dropdown(function (e) {
      this.register.action(e)
    })
    .menu('DIV', 'div')
    .menu('P', 'p')
    .menu('H1', 'h1')
    .menu('H2', 'h2')
    .menu('H3', 'h3')
    .menu('H4', 'h4')
    .menu('H5', 'h5')
    .menu('H6', 'h6')
}, function () {
  this.register.toolbar('heading')
})
