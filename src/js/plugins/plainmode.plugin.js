microEditor.plugins.register('plainmode', function () {
  this.create.button(function () {
    console.log(this.options.pasteAsPlain)
    this.options.pasteAsPlain = !this.options.pasteAsPlain
  })
    .icon('fa fa-file-text')
    .update(function (el) {
      if (this.options.pasteAsPlain) {
        el.classList.add('highlight')
      } else {
        el.classList.remove('highlight')
      }
    })
    .tooltip('toogle Paste Plain Mode')
}, function () {
  this.register.toolbar('plainmode')
})
