microEditor.plugins.register('color', function () {
  /**
   * buttons
   */
  var forecolor = this.create.button(function () {
    // this.register.action('bold')
  })
    .icon('fa fa-magic')
    .tooltip('Fore Color')

  var backcolor = this.create.button(function () {
    // this.register.action('bold')
  })
    .icon('fa fa-pencil-square')
    .tooltip('Back Color')

  /**
   * get script path
   */
  var col = document.getElementsByTagName('script')
  var scriptName = 'color.plugin.js'
  for (i = 0;i < col.length;i++) {
    j = col[i].src.lastIndexOf(scriptName)
    if (j >= 0) baseURL = col[i].src.substr(0, j - 1)
  }
  /**
   * register script
   */
  this.register.script(baseURL + '/jscolor/jscolor.min.js', function () {
    var _self = this;
    var foreOpts = {
      onFineChange: function () {
        _self.register.action("forecolor", this.toString());
      },
      styleElement: false,
      valueElement: false
    }
    new jscolor(forecolor, foreOpts)
    new jscolor(forecolor.childNodes[0], foreOpts)

    var backOpts = {
      onFineChange: function () {
        _self.register.action("backcolor", this.toString());
      },
      styleElement: false,
      valueElement: false
    }

    new jscolor(backcolor, backOpts)
    new jscolor(backcolor.childNodes[0], backOpts)
  })
}, function () {
  this.register.toolbar('color')
})
