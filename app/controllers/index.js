import { A } from '@ember/array';
import Ember from 'ember';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { equal, not } from '@ember/object/computed';
import { isPresent } from '@ember/utils';
import { htmlSafe } from '@ember/string';
import { later } from '@ember/runloop';
import { all } from 'rsvp';

import { task, timeout } from 'ember-concurrency';
import moment from 'moment';

const { escapeExpression } = Ember.Handlebars.Utils;

const TIMEOUT_INTERVAL = Ember.testing ? 2 : 1000 * 60 * 15;

export default Controller.extend({
isShowingUpdates: false,
 daysUntilPublishing: computed(function() {
   const today = new Date();
   return moment(today).day();
 }),
 isPublishingDay: equal('daysUntilPublishing', 5),
 isDayBeforePublishing: equal('daysUntilPublishing', 4),
  conListUniq: null,
  actions: {
    toggleUpdates() {
      this.toggleProperty('isShowingUpdates');
    },
    async getContributors() {
      let pulls = this.get('store').peekAll('githubPull');
      let mergedPulls = pulls.filter((pull) => {
        return moment(pull.get('mergedAt')) > moment("2018-11-02");
      });
      console.log({ pullsLen: pulls.length });
      console.log({ mergedPullsLen: mergedPulls.length });
      let userFetches = mergedPulls.map(pull => {
        console.log({ pullTitle: pull.get('title') });
        console.log({ pullDate: pull.get('mergedAt') });
        return pull.get('user');
      });
      let users = await all(userFetches);
      let uniqUsers = users.uniq();
      console.log({ uniqUsers });
      const copyLinks = uniqUsers.map((user) => {
        return `<a href="${user.get('htmlUrl')}" target="gh-user">@${user.get('login')}</a>`;
      }).join(', ');
      document.querySelector('.fetch-contributors').click();
      this.set('conListUniq', copyLinks);
    },
  }
});
