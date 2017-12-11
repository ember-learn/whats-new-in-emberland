import Ember from 'ember';
import Component from '@ember/component';
import { inject } from '@ember/service';
import { debounce, later } from '@ember/runloop';
import { computed } from '@ember/object';

import { task, timeout } from 'ember-concurrency';
import moment from 'moment';
import withTestWaiter from 'ember-concurrency-test-waiter/with-test-waiter';

const TIMEOUT_INTERVAL = Ember.testing ? 20 : 1000 * 60 * 5;

export default Component.extend({
  store: inject(),
  tagName: 'section',
  classNames: ['news-item', 'box',],
  isLoadingComments: false,
  timesReloaded: 0,
  updatedAt: computed('pull.updatedAt', function() {
    return moment(this.get('pull.updatedAt')).fromNow();
  }),
/*  async init() {
    this._super(...arguments);
    while(true) {
      try {
        await timeout(TIMEOUT_INTERVAL);
        console.log("loaded");
        this.get('reloadComments').perform();
      } catch(e) {
        console.log(e);
      }
    }
  }, */
  setLoadingIcon(pull) {
    const commentsUrl = pull.get('commentsUrl');
    return $.getJSON(commentsUrl).then((comments) => {
      this.set('comments', comments);
      this.set('isLoadingComments', false);
    });
  },
  reloadComments: task(function * () {
    const commentsUrl = this.get('pull.commentsUrl');
    this.set('isLoadingComments', true);
    yield $.getJSON(commentsUrl).then((comments) => {
      this.incrementProperty('timesReloaded');
      this.set('comments', comments);
      this.set('isLoadingComments', false);
    });
  }).drop(), // without concurrency test helper
  /*  reloadComments: withTestWaiter(task(function * () {
    const commentsUrl = this.get('pull.commentsUrl');
    this.set('isLoadingComments', true);
    yield $.getJSON(commentsUrl).then((comments) => {
      this.set('comments', comments);
      this.set('isLoadingComments', false);
    });
  }).drop()), */
  actions: {
    loadComments(pull) {
      this.set('isLoadingComments', true);
      debounce(this, this.setLoadingIcon, pull, 800);
      // later(this, this.setLoadingIcon, pull, 800);
    },
  /*  async loadComments(pull) { // using action as concurrency task
      this.set('isLoadingComments', true);
      // debounce(this, this.setLoadingIcon, pull, 800);
      this.get('reloadComments').perform();
    }, */
  }
});
