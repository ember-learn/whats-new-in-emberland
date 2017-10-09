import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
  store: inject(),
  tagName: 'section',
  classNames: ['news-item', 'box',],
  actions: {
    loadComments(pull) {
      /* const repo = this.get('repo');
      this.get('store').queryRecord('github-pull', { repo: repo.get('fullName'), pullNumber }).then((res) => {
        console.log(res);
      }); */
      const commentsUrl = pull.get('commentsUrl');
      $.getJSON(commentsUrl).then((comments) => {
        this.set('comments', comments);
      });
    },
  }
});
