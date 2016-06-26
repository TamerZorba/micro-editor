microEditor.plugins.register('createlink', function () {
  this.create.button(function () {
    this.register.action('createlink')
  })
    .icon('fa fa-link')
    .tooltip('Create Link')
})
