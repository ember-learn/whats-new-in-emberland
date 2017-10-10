import Component from '@ember/component';
import { inject } from '@ember/service';
import { later } from '@ember/runloop';
import { computed } from '@ember/object';

import { timeout } from 'ember-concurrency';
import moment from 'moment';

export default Component.extend({
  store: inject(),
  tagName: 'section',
  classNames: ['news-item', 'box',],
  isLoadingComments: false,
  updatedAt: computed('pull.updatedAt', function() {
    return moment(this.get('pull.updatedAt')).fromNow();
  }),
  setLoadingIcon(pull) {
    const commentsUrl = pull.get('commentsUrl');
    return $.getJSON(commentsUrl).then((comments) => {
      this.set('comments', comments);
      this.set('isLoadingComments', false);
    });
  },
  actions: {
    async loadComments(pull) {
      /* const repo = this.get('repo');
      this.get('store').queryRecord('github-pull', { repo: repo.get('fullName'), pullNumber }).then((res) => {
        console.log(res);
      }); */
      this.set('isLoadingComments', true);
      // debounce(this, this.setLoadingIcon, pull, 800);
      later(this, this.setLoadingIcon, pull, 2000);
    },
  }
});
