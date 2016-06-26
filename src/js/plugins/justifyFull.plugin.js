microEditor.plugins.register('justifyFull', function () {
  this.create.button(function () {
    this.register.action('justifyFull')
  })
    .icon('fa fa-align-justify')
    .highlight('justifyfull')
    .tooltip('Justify Full')
})
