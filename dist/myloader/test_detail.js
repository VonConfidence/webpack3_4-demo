
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }

var People = function () {
    function People(name) {
      _classCallCheck(this, People);
      this.name = name;
  }
  _createClass(People, [{
      key: 'sayName',
    value: function sayName() {
        console.log('Hello there, I\\'m ' + this.name);
    }
  }]);
  return People;
}();

var imweb = new People('imweb');
imweb.sayName();
//# sourceURL=webpack:///./src/myloader/test.js?