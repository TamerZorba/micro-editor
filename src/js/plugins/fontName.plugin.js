microEditor.plugins.register('fontName', function () {
  this.create.button()
    .icon('fa fa-font')
    .dropdown(function (e) {
      this.register.action('fontName', e)
    })
    .menu('Tahoma (Mac Only Font)', 'Tahoma')
    .menu('Arial')
}, function () {
  this.register.toolbar('fontName')
})
