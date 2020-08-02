import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { all } from 'rsvp';

export default class IndexController extends Controller {
  @tracked mergedPRs = [];
  @tracked newPRs = [];
  @tracked mergedRFCs = [];
  @tracked newRFCs = [];
  @tracked contributorsList = '';

  @action
  async getContributors() {
    const fetchRequests = this.mergedPRs.map(pullRequest => pullRequest.user);

    let users = await all(fetchRequests);
    users = this.identifyUsers(users);
    users = this.sortUsers(users);

    this.updateContributorsList(users);
  }

  identifyUsers(users) {
    // Remove users that are bots or appeared more than once
    const uniqueUsers = users.reduce((accumulator, user) => {
      const { htmlUrl, login: username, type } = user;

      const isUser = (type === 'User');
      const isNotDuplicate = !accumulator.has(username);

      if (isUser && isNotDuplicate) {
        accumulator.set(username, {
          handle: `@${username}`,
          profileLink: htmlUrl
        });
      }

      return accumulator;

    }, new Map());

    return Array.from(uniqueUsers.values());
  }

  sortUsers(users) {
    return users.sort((a, b) => {
      const value1 = a.handle.toLowerCase();
      const value2 = b.handle.toLowerCase();

      if (value1 > value2) return 1;
      if (value1 < value2) return -1;
      return 0;
    });
  }

  updateContributorsList(users) {
    const contributorsList = users
      .map(user => {
        const { handle, profileLink } = user;
        return `<a href="${profileLink}" rel="noopener noreferrer" target="_blank">${handle}</a>`;
      })
      .join(', ');

    this.set('contributorsList', contributorsList);
  }
}
