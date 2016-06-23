microEditor.plugins.register('insertOrderedList', function () {
  this.create.button(function () {
    this.register.action('insertOrderedList')
  })
    .icon('fa fa-list-ol')
    .highlight('insertorderedlist')
})
