import { A } from '@ember/array';
import Ember from 'ember';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { equal, not } from '@ember/object/computed';
import { isPresent } from '@ember/utils';
import { htmlSafe } from '@ember/string';
import { later } from '@ember/runloop';

import { task, timeout } from 'ember-concurrency';
import moment from 'moment';

const { escapeExpression } = Ember.Handlebars.Utils;

const TIMEOUT_INTERVAL = Ember.testing ? 2 : 1000 * 60 * 15;

export default Controller.extend({
init() {
  this._super(...arguments);
  later(() => this.set('isFinishedLoading', true), 10000);
},
isShowingUpdates: false,
isFinishedLoading: false,
stillLoading: not('isFinishedLoading'),
 daysUntilPublishing: computed(function() {
   const today = new Date();
   return moment(today).day();
 }),
 isPublishingDay: equal('daysUntilPublishing', 5),
 isDayBeforePublishing: equal('daysUntilPublishing', 4),
 updateModel: task(function * () {
    this.get('model').forEach((submodel) => {
      submodel.reload();
    });
  }),
  conListUniq: null,
  actions: {
    toggleUpdates() {
      this.toggleProperty('isShowingUpdates');
    },
    getContributors() {
      const list = document.querySelector('.contributors .hidden-list').innerHTML.split("\n");
      const names = A(list)
        .map((name) => name.replace(/<!-.*>/,''))
        .map((name) => {
          return name.trim();
        })
        .compact()
        .uniq();

      const links = names.map((contrib) => {
        const contributor = escapeExpression(contrib).trim();
        return `<a href="https://github.com/${contributor}" target="gh-user">@${contributor}</a>`;
      }).join(', ');
      document.querySelector('.fetch-contributors').click();
      this.set('conListUniq', links);
    },
  }
});
