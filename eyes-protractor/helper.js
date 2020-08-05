module.exports = {
   genBatchId: function () {
      var ts = Math.round((new Date()).getTime() / 1000).toString();
      return ts;
   }
};