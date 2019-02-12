var Grid = (function(global, $) {

  function Grid(MOUNT_NODE) {
    this.$MOUNT_NODE = $(MOUNT_NODE);
    this.table = {};
    this.dataTable = {};
    this.events = {};
  }

  Grid.prototype = {
    _buildTable: function() {
      var $table = $('<table>', {
        class: this.table.className
      });

      $table.append(this._buildThead());
      $table.append(this._buildTbody());

      return $table;
    },
    _buildTh: function(col, idx) {
      var $filterBtn = null;
      var $th = $('<th>', {
        class: 'Grid__Thead__Th' + (col.className || '')
      });
      var $span = $('<span>' + col.title + '</span>', {
        class: 'Grid__Thead__Th--' + idx
      });

      if (col.filter) {
        var filter = new GridFilter(this, col.filter);
        $filterBtn = $('<i class="icon-filter3">');
        filter.bindTo($filterBtn);
      }
      
      $th.append($span, $filterBtn);

      return $th;
    },
    _buildTbody: function() {
      return $('<tbody>', {
        class: 'Grid__Tbody'
      });
    },
    _buildThead: function() {
      var _self = this;
      var $tHead = $('<thead>', {
        className: 'Grid__Thead'
      });
      var $tr = $('<tr>');

      this.table.cols.forEach(function(col, idx) {
        $tr.append(_self._buildTh(col, idx));
      });

      $tHead.append($tr);

      return $tHead;
    },
    set: function(entity, options){
      this[entity] = options;
      
      return this;
    },
    _dispatchEvent: function(event) {
      var callbacks = this.events[event];

      if (callbacks && Array.isArray(callbacks)) {
        callbacks.forEach(function(cb) {
          cb();
        });
      }
    },
    removeEvent: function(event, fn) {
      if (fn && typeof fn === 'function') {
        this.events[event] = this.events[event].filter(function(cb) {
          return cb.toString() !== fn.toString();
        });
      } else {
        delete this.events[event];
      }

      return this;
    },
    addEvent: function(event, cb) {
      this.events[event] = this.events[event] ? this.events[event].concat(cb) : [cb];

      return this;
    },
    run: function() {
      var _self = this;

      return new Promise(function(resolve, reject) {
        var $table = _self._buildTable();
        _self._dispatchEvent('table-built:grid');

        _self.$MOUNT_NODE.append($table);
        _self._dispatchEvent('table-appended:grid');
        _self.api = $table.DataTable(_self.dataTable);

        resolve();
      });
    }
  }

  return Grid;
})(window, jQuery);