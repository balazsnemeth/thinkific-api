'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Iterable = require('./Iterable');

var _Iterable2 = _interopRequireDefault(_Iterable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Products = function () {
  function ProductHandler(_client) {
    _classCallCheck(this, ProductHandler);

    this._client = _client;
  }

  _createClass(ProductHandler, [{
    key: 'getList',
    value: function getList() {
      return this._getPage(1);
    }
  }, {
    key: '_getPage',
    value: function _getPage() {
      var _this = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      return this._get(this._uriPage(page)).then(function (response) {
        return new _Iterable2.default(response.items, response.meta.pagination, _this);
      });
    }
  }, {
    key: '_uriPage',
    value: function _uriPage() {
      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      return 'products?page=' + page;
    }
  }, {
    key: '_uriSingle',
    value: function _uriSingle(id) {
      return 'products/' + id;
    }
  }, {
    key: '_get',
    value: function _get() {
      var _client2;

      return (_client2 = this._client)._get.apply(_client2, arguments);
    }
  }, {
    key: '_post',
    value: function _post() {
      var _client3;

      return (_client3 = this._client)._post.apply(_client3, arguments);
    }
  }]);

  return ProductHandler;
}();

exports.default = Products;