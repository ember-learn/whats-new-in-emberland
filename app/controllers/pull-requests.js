import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { all } from 'rsvp';
import { shuffle } from 'whats-new-in-emberland/utils/pull-request';
import { htmlSafe } from '@ember/template';

export default class PullRequestsController extends Controller {
  queryParams = ['mergedSince'];

  @tracked mergedPRs = [];
  @tracked updatedPRs = [];
  @tracked contributorsList = '';

  @service githubSession;

  get contributorsListRendered() {
    return htmlSafe(this.contributorsList);
  }

  @action
  async getContributors() {
    let users = this.mergedPRs.map(({ user }) => user);
    users = this.identifyUsers(users);
    users = shuffle(users);
    users = await this.fetchAdditionalUserDetails(users);

    this.updateContributorsList(users);
  }

  identifyUsers(users) {
    // Remove users that are bots or appeared more than once
    const uniqueUsers = users.reduce((accumulator, user) => {
      const { html_url: htmlUrl, login: username, type, url } = user;

      const isUser = type === 'User';
      const isNotDuplicate = !accumulator.has(username);

      if (isUser && isNotDuplicate) {
        accumulator.set(username, {
          handle: `@${username}`,
          profileLink: htmlUrl,
          url,
        });
      }

      return accumulator;
    }, new Map());

    return Array.from(uniqueUsers.values());
  }

  async fetchAdditionalUserDetails(users) {
    let userPromises = users.map((user) => {
      return fetch(user.url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `token ${this.githubSession.githubAccessToken}`,
        },
      }).then((response) => response.json());
    });

    let userDataResponses = await all(userPromises);

    return users.map((user, index) => ({
      ...user,
      name: userDataResponses[index].name,
      avatarUrl: userDataResponses[index].avatar_url,
    }));
  }

  updateContributorsList(users) {
    const contributorsList = users.map((user) => {
      const { handle, profileLink, name, avatarUrl } = user;
      let displayName;

      if (name) {
        displayName = `${name} (${handle})`;
      } else {
        displayName = handle;
      }

      return `<a href="${profileLink}" rel="noopener noreferrer" target="_blank"><img src="${avatarUrl}" alt="${displayName}"/>${displayName}</a>`;
    });

    this.contributorsList = `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); grid-gap: 1em; word-break: break-word;">
      ${contributorsList.join('\n')}
    </div>`;
  }
}
