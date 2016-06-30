microEditor.plugins.register('fontName', function () {
  this.create.button()
    .icon('fa fa-font')
    .dropdown(function (e) {
      this.register.action('fontName', e)
    })
    .tooltip('Font Name')
    .menu('Tahoma')
    .menu('Arial')
    .menu('Comic Sans MS')
    .menu('Courier New')
    .menu('Impact')
    .menu('Times New Roman')
    .menu('Trebuchet MS')
    .menu('Verdana')
    .menu('Symbol')
    .menu('Helvetica')
    .menu('Monospace')

}, function () {
  this.register.toolbar('fontName')
})
