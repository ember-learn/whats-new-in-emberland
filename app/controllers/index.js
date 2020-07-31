import Controller from '@ember/controller';
import { all } from 'rsvp';

export default Controller.extend({
  contributorsList: '',

  actions: {
    async getContributors() {
      const { mergedPulls } = this.model;
      const fetchRequests = mergedPulls.map(pull => pull.get('user'));

      let users = await all(fetchRequests);
      users = this.identifyUsers(users);
      users = this.sortUsers(users);

      this.updateContributorsList(users);
    }
  },

  identifyUsers(users) {
    // Remove users that are bots or appeared more than once
    const uniqueUsers = users.reduce((accumulator, user) => {
      const { htmlUrl, login: username, type } = user;

      const isNotBot = (type === 'User');
      const isNotDuplicate = !accumulator.has(username);

      if (isNotBot && isNotDuplicate) {
        accumulator.set(username, {
          handle: `@${username}`,
          profileLink: htmlUrl
        });
      }

      return accumulator;

    }, new Map());

    return Array.from(uniqueUsers.values());
  },

  sortUsers(users) {
    return users.sort((a, b) => {
      if (a.handle > b.handle) return 1;
      if (a.handle < b.handle) return -1;
      return 0;
    });
  },

  updateContributorsList(users) {
    const contributorsList = users
      .map(user => {
        const { handle, profileLink } = user;
        return `<a href="${profileLink}" rel="noopener noreferrer" target="_blank">${handle}</a>`;
      })
      .join(', ');

    this.set('contributorsList', contributorsList);
  }
});
