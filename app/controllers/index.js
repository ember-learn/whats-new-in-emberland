import Controller from '@ember/controller';
import { all } from 'rsvp';

export default Controller.extend({
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
