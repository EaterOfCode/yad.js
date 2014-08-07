(function() {

    var Yad = function(tag) {
        if (!(this instanceof Yad)) {
            return new Yad(tag);
        }
        this.nodes = Yad.parseElementArg(tag);
    }

    Yad.parseElementArg = function(tag){
      if(tag instanceof Yad){
        return this.nodes;
      }
      if (typeof(tag) === 'string' || tag === undefined){
        return [document.createElement(tag || "div")];
      }
      if (tag instanceof HTMLElement){
        return [tag];
      }  
      if (tag instanceof Array || tag instanceof NodeList || tag instanceof HTMLCollection) {
          var nodes = [];
          for (var i = 0, l = tag.length; i < l; i++) {
              if (typeof(tag[i]) == 'string') nodes.push(document.createElement(tag[i]));
              if (tag[i] instanceof HTMLElement) nodes.push(tag[i]);
              if(tag[i] instanceof Yad) [].push.apply(nodes, tag[i].nodes)
          }
          return nodes;
      }
      return [];
    }

    Yad.prototype = Yad.fn = {
        attr: function(n, v) {
            if (typeof(n) == 'object') {
                var that = this,
                    k = Object.keys(n);
                k.forEach(function(key) {
                    that.attr(key, n[key]);
                });
                return this;
            }
            if (v === undefined) {
                return this.nodes[0] ? this.nodes[0][n] : undefined;
            } else {
                for (var i = this.nodes.length - 1; i >= 0; i--) {
                    this.nodes[i][n] = v;
                };
                return this
            }
        },
        css: function(n, v) {
            if (typeof(n) == 'object') {
                var that = this,
                    k = Object.keys(n);
                k.forEach(function(key) {
                    that.css(key, n[key]);
                });
                return this;
            }
            if (v === undefined) {
                return this.nodes[0] ? this.nodes[0].style[n] : undefined;
            } else {
                for (var i = this.nodes.length - 1; i >= 0; i--) {
                    this.nodes[i].style[n] = v;
                };
                return this;
            }
        },
        on: function(n, v) {
            if (typeof(n) == 'object') {
                var that = this,
                    k = Object.keys(n);
                k.forEach(function(key) {
                    that.on(key, n[key]);
                });
                return this;
            }
            for (var i = this.nodes.length - 1; i >= 0; i--) {
                this.nodes[i].addEventListener(n, v);
            };
            return this;
        },
        get: function(i) {
            return i !== undefined ? this.nodes[(i % this.nodes.length + this.nodes.length) % this.nodes.length] : this.nodes;
        },
        remove: function() {
            for (var i = this.nodes.length - 1; i >= 0; i--) {
                if (this.nodes[i].parentNode) this.nodes[i].parentNode.removeChild(this.nodes[i]);
            };
            return this;
        },
        empty: function(){
          for (var i = this.nodes.length - 1; i >= 0; i--) {
              this.nodes[i].innerHTML = "";
          }
        },
        last: function(){
          return Yad(this.get(-1));
        },
        first:function(){
          return Yad(this.get(0))
        },
        add: function(arg){
          [].push.apply(this.nodes, Yad.parseElementArg(arg));
          return this;
        }
    }

    Yad.query = Yad.q = function(sel, ele) {
        return new Yad(document.querySelectorAll(sel, ele))
    }

    Yad.queryOne = Yad.q1 = function(sel, ele) {
        return new Yad(document.querySelector(sel, ele))
    }

    window.y = window.yad = Yad;

})(window)
