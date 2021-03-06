import check from 'check-types';

import Iterable from './Iterable';

/** Class defining the default query handler */
const DefaultHandler = class DefaultHandler {
  constructor(resource, _client) {
    this._client = _client;
    this._resource = resource;
  }

  /**
   * @summary Get the first page of a list resource
   * @return {Iterable} A iterable list of resources. Check {@link Iterable} object definition.
   */
  getList() {
    return this._getPage(1);
  }

  /**
   * @summary Get a resource from its id
   * @param  {Number} id Resource id
   * @return {Object} Resource found.
   */
  getById(id) {
    check.assert.assigned(id, 'Missing id parameter');

    return this._get(this._uriSingle(id));
  }

  /**
   * @summary Create a new resource
   * @param  {Object} data Resource information. Check Thinkific API docs for properties needed
   * @return {Object} Resource created.
   */
  create(data) {
    check.assert.assigned(data, 'Missing data parameter');

    return this._post(this._uri, data);
  }

  /**
   * @summary Update a resource
   * @param  {Number} id Resource id
   * @param  {Object} data New resource data object
   * @return {} Empty object (returned by Thinkific API).
   */
  put(id, data) {
    check.assert.assigned(id, 'Missing id parameter');
    check.assert.assigned(data, 'Missing data parameter');

    return this._put(this._uriSingle(id), data);
  }

  /**
   * @summary Delete a resource
   * @param  {Number} id Resource id
   * @return {} Empty object (returned by Thinkific API).
   */
  delete(id) {
    check.assert.assigned(id, 'Missing id parameter');

    return this._del(this._uriSingle(id));
  }

  /**
   * @async
   * @summary Find a resource
   * @param  {string} property Property to match value
   * @param  {string} value Value to match with resource property
   * @return {Object} Resource found or null
   */
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

  _put(...params) {
    return this._client._put(...params);
  }

  _del(...params) {
    return this._client._del(...params);
  }

  _uriPage(page = 1) {
    return `${this._uri}?page=${page}`;
  }

  _uriSingle(id) {
    return `${this._uri}/${id}`;
  }

  get _uri() { return this._resource; }
};

export default DefaultHandler;
