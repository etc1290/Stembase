
(function() {
  var mntdrag,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments) } }

  mntdrag = (function() {
    function mntdrag(el) {
      this.el = el
      this.dragleave = __bind(this.dragleave, this)
      this.dragenter = __bind(this.dragenter, this)
      if (this.supportsEventConstructors()) {
        this.first = false
        this.second = false
        this.el.addEventListener("dragenter", this.dragenter, false)
        this.el.addEventListener("dragleave", this.dragleave, false)
      }
    }

    mntdrag.prototype.dragenter = function(event) {
      if (this.first) {
        return this.second = true
      } else {
        this.first = true
        return this.el.dispatchEvent(new CustomEvent("mntdrag:enter", {
          bubbles: true,
          cancelable: true,
          detail: {
            dataTransfer: event.dataTransfer
          }
        }))
      }
    }

    mntdrag.prototype.dragleave = function(event) {
      if (this.second) {
        this.second = false
      } else if (this.first) {
        this.first = false
      }
      if (!this.first && !this.second) {
        return this.el.dispatchEvent(new CustomEvent("mntdrag:leave", {
          bubbles: true,
          cancelable: true,
          detail: {
            dataTransfer: event.dataTransfer
          }
        }))
      }
    }

    mntdrag.prototype.removeListeners = function() {
      this.el.removeEventListener("dragenter", this.dragenter, false)
      return this.el.removeEventListener("dragleave", this.dragleave, false)
    }

    mntdrag.prototype.supportsEventConstructors = function() {
      try {
        new CustomEvent("z")
      } catch (_error) {
        return false
      }
      return true
    }

    mntdrag.prototype.reset = function() {
      this.first = false
      return this.second = false
    }

    return mntdrag

  })()

  window.mntdrag = mntdrag

}).call(this)
