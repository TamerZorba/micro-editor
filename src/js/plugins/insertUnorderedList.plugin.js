microEditor.plugins.register('insertUnorderedList', function () {
  this.create.button(function () {
    this.register.action('insertUnorderedList')
  })
    .icon('fa fa-list-ul')
    .highlight('insertunorderedlist')
})
