import RESTSerializer from '@ember-data/serializer/rest';
import { underscore } from '@ember/string';

export default class PullRequestSerializer extends RESTSerializer {
  keyForAttribute(attr) {
    return underscore(attr);
  }

  normalizeQueryResponse(store, primaryModelClass, payload, id, requestType) {
    const newPayload = {
      pullRequests: payload.items
    };

    return super.normalizeQueryResponse(store, primaryModelClass, newPayload, id, requestType);
  }
}
