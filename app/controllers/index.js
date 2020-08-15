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
    users = await this.fetchAdditionalUserDetails(users);

    this.updateContributorsList(users);
  }

  identifyUsers(users) {
    // Remove users that are bots or appeared more than once
    const uniqueUsers = users.reduce((accumulator, user) => {
      const { htmlUrl, login: username, type, url } = user;

      const isUser = (type === 'User');
      const isNotDuplicate = !accumulator.has(username);

      if (isUser && isNotDuplicate) {
        accumulator.set(username, {
          handle: `@${username}`,
          profileLink: htmlUrl,
          url
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

  async fetchAdditionalUserDetails(users) {
    let userPromises = [];
    users.forEach((user) => {
      userPromises.push(fetch(user.url).then((response) => response.json()));
    });

    let userDataResponses = await all(userPromises);

    return users.map((user, index) => ({
      ...user,
      name: userDataResponses[index].name || "",
    }));
  }

  updateContributorsList(users) {
    const contributorsList = users
      .map(user => {
        const { handle, profileLink, name } = user;

        const constructedName = name ? `${name} ` : '';

        return `<a href="${profileLink}" rel="noopener noreferrer" target="_blank">${constructedName}(${handle})</a>`;
      })
      .join(', ');

    this.set('contributorsList', contributorsList);
  }
}
