microEditor.plugins.register('strikeThrough', function () {
  this.create.button(function () {
    this.register.action('strikeThrough')
  })
    .icon('fa fa-strikethrough')
    .highlight('strikethrough')
})
