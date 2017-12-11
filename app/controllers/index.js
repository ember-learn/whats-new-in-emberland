import Ember from 'ember';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { isPresent } from '@ember/utils';

import { task, timeout } from 'ember-concurrency';
import moment from 'moment';

const TIMEOUT_INTERVAL = Ember.testing ? 2 : 1000 * 60 * 15;

export default Controller.extend({
/*  async init() {
    this._super(...arguments);
    /*while(true) {
      try {
        await timeout(TIMEOUT_INTERVAL);
        this.get('updateModel').perform();
      } catch(e) {
        console.log(e);
      }
    }
  }, */
isShowingUpdates: false,
 daysUntilPublishing: computed(function() {
   const today = new Date();
   return moment(today).day();
 }),
 isPublishingDay: equal('daysUntilPublishing', 5),
 isDayBeforePublishing: equal('daysUntilPublishing', 4),
  updatedProjectItems: computed('repos.@each.isLoaded', function() {
    const repos = this.get('repos');
    if (isPresent(repos)) {
      const model = this.get('repos').filterBy('isNewThisWeek', true);
      return model;
    }
  }),
  updateModel: task(function * () {
    this.get('model').forEach((submodel) => {
      submodel.reload();
    });
  }),
  actions: {
    toggleUpdates() {
      this.toggleProperty('isShowingUpdates');
    }
  }
});
