import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { all } from 'rsvp';

import moment from 'moment';

export default Controller.extend({
 daysUntilPublishing: computed(function() {
   const today = new Date();
   return moment(today).day();
 }),
 isPublishingDay: equal('daysUntilPublishing', 5),
 isDayBeforePublishing: equal('daysUntilPublishing', 4),
  conListUniq: null,
  actions: {
    async getContributors() {
      let model = this.get('model');
      let mergedPulls = model.mergedPulls;
      let users = await all(mergedPulls.map((pull) => pull.get('user')));
      let userLinks = users
        .uniq()
        .reject((user) => user.get('login').includes('[bot]'))
        .map((user) => {
        return `<a href="${user.get('htmlUrl')}" target="gh-user">@${user.get('login')}</a>`;
      }).join(', ');

      document.querySelector('.fetch-contributors').click();
      this.set('conListUniq', userLinks);
    },
  }
});
