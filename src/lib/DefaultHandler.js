import check from 'check-types';

import Iterable from './Iterable';

const DefaultHander = class DefaultHandler {
  constructor(resource, _client) {
    this._client = _client;
    this.resource = resource;
  }

  getList() {
    return this._getPage(1);
  }

  getById(id) {
    check.assert.assigned(id, 'Missing id parameter');

    return this._get(this._uriSingle(id));
  }

  async find(property, value) {
    let list = await this.getList();

    do {
      for (let i = 0; i < list.items.length; i++) {
        const item = list.items[i];

        if (item[property] === value) {
          return item;
        }
      }

      // get next page
      list = await list.getNext();
    } while (list);

    return null;
  }

  _getPage(page = 1) {
    return this._get(this._uriPage(page))
      .then((response) => {
        return new Iterable(response.items, response.meta.pagination, this);
      });
  }

  _get(...params) {
    return this._client._get(...params);
  }

  _post(...params) {
    return this._client._post(...params);
  }

  _uriPage(page = 1) {
    return `${this.resource}?page=${page}`;
  }

  _uriSingle(id) {
    return `${this.resource}/${id}`;
  }
};

export default DefaultHander;