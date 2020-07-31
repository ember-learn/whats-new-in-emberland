import Controller from '@ember/controller';
import { all } from 'rsvp';

export default Controller.extend({
  contributorsList: '',

  actions: {
    async getContributors() {
      const { mergedPulls } = this.model;

      const fetchRequests = mergedPulls.map(pull => pull.get('user'));
      const users = await all(fetchRequests);

      // Remove users that are bots or appeared more than once
      const uniqueUsers = users
        .reduce((accumulator, user) => {
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

      // Sort users by handle
      const sortedUsers = Array.from(uniqueUsers.values())
        .sort((a, b) => {
          if (a.handle > b.handle) return 1;
          if (a.handle < b.handle) return -1;
          return 0;
        });

      // Create the contributor list
      const contributorsList = sortedUsers
        .map(user => {
          const { handle, profileLink } = user;
          return `<a href="${profileLink}" target="_blank">${handle}</a>`;
        })
        .join(', ');

      this.set('contributorsList', contributorsList);
    }
  }
});
