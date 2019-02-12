(function() {
  function Grid(MOUNT_NODE) {
    this.$MOUNT_NODE = $(MOUNT_NODE);
  };
  Grid.prototype = {
    _buildTable: function() {

    },
    _buildTh: function(col) {

    },
    _buildTableHeader: function(cols) {
      
    },
    setCols: function(cols){
      if (!Array.isArray(cols))
        throw Error('Columns must be array.');
      
      
      return this;
    }
  }
})();




{/* <table class="table datatable-scroll-y" id="users" width="100%">
  <thead>
    <tr>
      <th>Id</th>
      <th>Customer Id</th>
      <th>Status</th>
      <th>Date Created</th>
      <th class="text-center actions">Actions</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table> */}
