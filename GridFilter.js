var GridFilter = (function(global, $) {
  function GridFilter(parent, filter) {
    this._parent = parent;
    this._filter = filter;
  }

  GridFilter.prototype = {
    bindTo: function($el) {
      $el.on('click', function() {
        console.log(JSON.stringify(this._filter))
      });
    }
  }

  return GridFilter;
})(window, jQuery);