import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

import { task, timeout } from 'ember-concurrency';

const TIMEOUT_INTERVAL = 1000 * 60 * 1/2;

export default Controller.extend({
  async init() {
    this._super(...arguments);
    while(true) {
      try {
        await timeout(TIMEOUT_INTERVAL);
        this.get('updateModel').perform();
      } catch(e) {
        console.log(e);
      }
    }
  },
  updatedProjectItems: computed('repos.@each.isLoaded', function() {
    const repos = this.get('repos');
    if (isPresent(repos)) {
      const model = this.get('repos').filterBy('isNewThisWeek', true);
      return model;
    }
  }),
  updateModel: task(function * () {
    console.log("so");
    console.log(this.get('model'));
    this.get('model').forEach((submodel) => {
      submodel.reload();
    });
  }),
});
