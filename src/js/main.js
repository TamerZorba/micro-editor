/**
 * microEditor
 * lightweight wysiwyg editor
 * 
 * author: Tamer Zorba
 * license : MIT
 */

var microEditor = function (el) {
  var _self = this

  this.options = {
    el: 'editor', // default element id
    toolbar: 'undo redo bold italic underline strikeThrough justifyLeft ' +
      'justifyCenter justifyRight justifyFull blockquote indent outdent insertUnorderedList ' +
      'insertOrderedList createlink unlink insertimage subscript superscript removeFormat print', // all the buttons in toolbar
    debugMode: false, // show the original text area
    pasteAsPlain: false, // convert pasted text as plain text
    preventPaste: false, // prevent user from pasting text
    expandable: false, // expand the editor by style
    showOnFocus: false, // show toolbar only when focus
    position: 'top', // toolbar position
    height: 100, // editor height
    debounce: 10, // time to thread update textarea content
    init: null, // init function to register some attrs or events
    extended: false, // private check to check if extended
  }

  /**
   * extend Function
   */
  this.extends = function (obj1, obj2) {
    for (var i in obj2) {
      obj1[i] = obj2[i]
    }
    return obj1
  }

  // extract element from object
  if (el instanceof Object) {
    this.options.extended = true;
    this.extends(this.options, el)
    el = this.options.el
  }

  // could b id or element it self
  if (el instanceof Element) {
    this.el = el
  } else {
    this.el = document.getElementById(el)
  }

  if (!this.el) {
    console.error('No Element called ' + id)
  }

  /**
   * create unique key (idx)
   */
  if (!window.microEditorObject) {
    window.microEditorObject = {}
    window.microEditorObject.counter = 0
  }
  window.microEditorObject.counter++

  this.idx = window.microEditorObject.counter

  /**
   * init Function
   */
  this.init = function () {
    // TODO : check if we add another call to the same textarea
    if (this.el.microEditor)return
    this.el.microEditor = this

    this.prepare()
    var editor = this.create.editor()

    if (this.options.position != 'top') {
      editor.render()
    }

    // init
    if(this.options.init){
      this.options.init.call(this);
    }

    // plugins init
    for (var i in microEditor.plugins.init) {
      microEditor.plugins.init[i].call(this)
    }

    this.editor.innerHTML = _self.register.event.triggerAll('setContent', this.el.value)

    // plugins hook
    var toolbar = this.options.toolbar.split(' ')
    for (var i in toolbar) {
      if (microEditor.plugins.list[toolbar[i]]) {
        microEditor.plugins.list[toolbar[i]].call(this)
      } else {
        if (toolbar[i].trim() !== '') console.error('No Plugin Called : ' + toolbar[i])
      }
    }

    if (this.options.position == 'top') {
      editor.render()
    }

    // set the default value from textarea if exist
    this.register.event.dropdownCloseListener()
  }

  /**
   * create elements
   */
  this.create = {
    /**
     * create BUTTON
     */
    button: function (text, callback) {
      // create item
      var div = document.createElement('div')
      var item = document.createElement('button')
      div.classList.add('button-container')
      div.appendChild(item)
      div.addEventListener('mousedown', function (e) {
        // this prevent loosing focus when pressing inside any button
        e.preventDefault()
      })

      if (!callback) {
        callback = text
      } else {
        // add text to item
        var textnode = document.createTextNode(text)
        item.appendChild(textnode)
      }

      // add event listener
      item.addEventListener('click', function (e) {
        e.preventDefault()
        if (callback) callback.call(_self, item, e)
        _self.register.update.triggerAll()

        // dropdown events
        _self.register.event.dropdownCloseAll()
        if (item.dropdownContent) item.dropdownContent.classList.toggle('show')
      })

      item.icon = function (e) {
        item.innerHTML = "<i class='" + e + "'></i>"
        return item
      }

      item.update = function (callback) {
        _self.register.update.define(item, callback)
        return item
      }

      item.highlight = function (state, value) {
        this.update(function (el) {
          var val = value ? _self.register.cmd.value(state, value) == value : _self.register.cmd.state(state)
          if (val) {
            el.classList.add('highlight')
          } else {
            el.classList.remove('highlight')
          }
        })
        return item
      }

      item.parent = function () {
        return div
      }

      item.dropdownContent = null
      item.dropdownCallback = null
      item.dropdown = function (cb) {
        item.classList.add('dropbtn')
        item.dropdownContent = document.createElement('div')
        item.dropdownContent.classList.add('dropdown-content')
        div.appendChild(item.dropdownContent)
        item.dropdownCallback = cb
        return item
      }

      item.menu = function (text, cb) {
        var menu = document.createElement('a')
        menu.innerHTML = text
        menu.addEventListener('click', function (e) {
          e.preventDefault()
          if (item.dropdownCallback) {
            item.dropdownCallback.call(_self, cb || text, item)
          }
          if (typeof a == 'function') {
            item.dropdownCallback.call(_self, item)
          }
        })
        item.dropdownContent.appendChild(menu)
        return item
      }

      item.modal = function (cb) {
        cb.call(_self, item)
      }

      item.tooltip = function(e){
        item.setAttribute("tip", e);
        return item;
      }

      _self.append(div)
      return item
    },

    /**
     * create INPUT
     */
    input: function (type, callback) {
      // create item
      var item = document.createElement('input')
      item.type = typeof type == 'string' ? type : 'text'

      if (!callback) {
        callback = type
      }

      // add event listener
      item.addEventListener('change', function (e) {
        callback.call(_self, e)
      })
      item.icon = function (e) {
        item.innerHTML = "<i class='" + e + "'></i>"
      }
      _self.append(item)
      return item
    },

    /**
     * create DIV
     */
    editor: function () {
      // create item
      var item = document.createElement('div')
      item.classList.add('editor')
      item.contentEditable = true

      _self.register.threadEvent(item, 'click keyup focus mouseup', function () {
        _self.register.update.triggerAll()
      })

      _self.register.threadEvent(item, 'blur keyup paste input focus', function () {
        _self.el.value = _self.register.event.triggerAll('getContent', this.innerHTML)
      }, _self.options.debounce || 10)

      _self.el.addEventListener('change', function () { // we may need keyup listener
        item.innerHTML = _self.register.event.triggerAll('setContent', _self.el.value)
      })

      if (!_self.options.debugMode) {
        _self.el.style.display = 'none'
      }

      item.addEventListener('paste', function (e) {
        if (_self.options.preventPaste || _self.options.pasteAsPlain) {
          e.preventDefault()
        }

        if (_self.options.pasteAsPlain) {
          if (_self.options.preventPaste) return
          var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste something..')
          _self.register.action('insertText', text)
        }
      })

      if (!_self.options.expandable) {
        item.style.height = _self.options.height || 100
        item.style.overflow = 'auto'
      }

      if (_self.options.showOnFocus) {
        var focused = false
        var keep = false
        _self.container.classList.add('onfocus')
        _self.container.addEventListener('mouseover', function () {
          _self.container.classList.add('focused')
          keep = true
        })
        _self.container.addEventListener('mouseout', function () {
          if (!focused) _self.container.classList.remove('focused')
          keep = false
        })
        item.addEventListener('focus', function (e) {
          if (focused) return
          focused = true
          _self.container.classList.add('focused')
        })
        item.addEventListener('mouseover', function (e) {
          if (focused) return
          _self.container.classList.add('focused')
        })
        item.addEventListener('blur', function (e) {
          focused = false
          if (!keep) _self.container.classList.remove('focused')
        })
        item.addEventListener('mouseout', function (e) {
          if (!focused && !keep) _self.container.classList.remove('focused')
        })
      }
      
      // disable buttons when loose focus
      item.addEventListener('focus', function (e) {
        _self.register.event.disableAllButtons(false)
      })
      item.addEventListener('blur', function (e) {
        _self.register.event.disableAllButtons(true)
      })

      item.render = function () {
        _self.append(item)
        _self.register.event.disableAllButtons(true)
      }

      _self.editor = item
      return item
    }
  }

  /**
   * register Editor actions
   */
  this.register = {
    /**
     * command
     */
    action: function (command, value) {
      if (
        command == 'h1' ||
        command == 'h2' ||
        command == 'h3' ||
        command == 'h4' ||
        command == 'h5' ||
        command == 'h6' ||
        command == 'p' ||
        command == 'blockquote' ||
        command == 'pre' ||
        command == 'div' ||
        command == 'code'
      ) {
        document.execCommand('formatBlock', false, command)
      } else if (command == 'forecolor' || command == 'backcolor') {
        document.execCommand(command, false, value)
      } else if (command == 'print') {
        this.doPrint()
      } else if (command == 'createlink' || command == 'insertimage') {
        url = prompt('Enter the link here: ', 'http:\/\/')
        document.execCommand(command, false, url)
      } else {
        document.execCommand(command, false, value)
      }
    },

    /**
     * get command state or value
     */
    cmd: {
      state: function (e) {
        return document.queryCommandState(e)
      },
      value: function (e) {
        return document.queryCommandValue(e)
      }
    },

    /**
     * threaded Event call
     */
    threadTimer: {},
    threadTime: 100,
    threadEvent: function (item, events, callback, timeout) {
      var events = events.split(' ')
      for (var i in events) {
        item.addEventListener(events[i], function () {
          clearTimeout(_self.register.threadTimer[events])
          _self.register.threadTimer[events] = setTimeout(function () {
            callback.call(item, events[i])
          }, timeout || _self.register.threadTime)
        })
      }
    },

    /**
     * print
     */
    doPrint: function () {
      var printer = window.open('', '_blank', 'width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes')
      printer.document.open()
      printer.document.write('<!doctype html><html><head><title>Print<\/title><\/head><body onload="print();">' + _self.editor.innerHTML + '<\/body><\/html>')
      printer.document.close()
    },
    /**
     * add to toolbar
     */
    toolbar: function (e) {
      if(_self.options.extended)return;
      _self.options.toolbar += ' ' + e
    },

    /**
     * update item status by callback
     */
    update: {
      list: [],
      define: function (item, callback) {
        this.list.push([item, callback])
      },
      triggerAll: function () {
        for (var i in this.list) {
          this.list[i][1].call(_self, this.list[i][0])
        }
      }
    },

    /**
     * global events trigger
     */
    event: {
      dropdownCloseListener: function () {
        var _self = this
        window.onclick = function (event) {
          if (!(event.target.matches('.dropbtn') || event.target.matches('i'))) {
            _self.dropdownCloseAll()
          }
        }
      },
      dropdownCloseAll: function () {
        var dropdowns = document.getElementsByClassName('dropdown-content')
        var i
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i]
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show')
          }
        }
      },
      disableAllButtons: function (state) {
        var els = document.querySelectorAll('.microEditor-idx' + _self.idx + ' .button-container>button')
        var i
        for (i = 0; i < els.length; i++) {
          var elm = els[i]
          elm.disabled = state
        }
      },

      list: {
        'getContent': [],
        'setContent': [],
      },
      triggerAll: function (idx, e) {
        if (!this.list[idx])return e
        for (var i in this.list[idx]) {
          e = this.list[idx][i].call(_self, e)
        }
        return e
      },
      on: function (idx, callback) {
        if (!this.list[idx])this.list[idx] = []
        this.list[idx].push(callback)
      }
    },
  }

  /**
   * prepare Function
   */
  this.prepare = function () {
    this.container = document.createElement('div')
    this.container.classList.add('microEditor')
    this.container.classList.add('microEditor-idx' + this.idx)
    var idx = this.getIndex()
    this.el.parentNode.insertBefore(this.container, this.el.parentNode.childNodes[idx])
  }

  /**
   * append Function
   */
  this.append = function (elm) {
    this.container.appendChild(elm)
  // var idx = this.getIndex()
  // this.el.parentNode.insertBefore(elm, this.el.parentNode.childNodes[idx])
  }

  /**
   * getIndex Function
   */
  this.getIndex = function () {
    var k = 0,
      e = this.el
    while (e = e.previousSibling) {
      ++k
    }
    return k
  }

  /**
   * init editor Function
   */
  this.init()

  return this
}

/**
 * Plugin Manager
 */
microEditor.plugins = {
  init: {},
  list: {},
  register: function (e, cb, init) {
    this.list[e] = cb
    if (init) this.init[e] = init
  }
}
