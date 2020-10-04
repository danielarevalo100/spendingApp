module.exports.listen = function(name, action) {
    window.addEventListener(name, action);
  }
  
  module.exports.post = function(name, params) {
    window.dispatchEvent(new CustomEvent(name, {
      detail: params
    }));
  }
  