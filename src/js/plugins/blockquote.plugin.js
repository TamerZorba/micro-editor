microEditor.plugins.register('blockquote', function () {
  this.create.button(function () {
    this.register.action('blockquote')
  })
    .icon('fa fa-quote-left')
    .tooltip('BlockQuote')
})
