import { inject as service } from '@ember/service';
import RESTAdapter from '@ember-data/adapter/json-api';
import { buildUrlForSearchingPRs } from 'whats-new-in-emberland/utils/pull-request';

export default class PullRequestAdapter extends RESTAdapter {
  @service githubSession;

  get headers() {
    return {
      'Accept': 'application/json',
      'Authorization': `token ${this.githubSession.githubAccessToken}`,
    }
  }

  urlForQuery(query) {
    const { organization, updatedSince } = query;

    delete query.organization;
    delete query.updatedSince;

    return buildUrlForSearchingPRs(organization, updatedSince);
  }
}
