import moment from 'moment';

const currentDay = moment().day();
const index = (currentDay < 6) ? -1 : 6;

export const mostRecentSaturday = moment().day(index).startOf('day');


/*
  `GET /search/issues` searches issues and pull requests.

  It returns up to 100 results per page.

  https://docs.github.com/rest/reference/search#search-issues-and-pull-requests
  https://docs.github.com/github/searching-for-information-on-github/searching-issues-and-pull-requests
*/
export function buildUrlForSearchingPRs(organization, createdSince) {
  const qualifiers = [
    'is:pr',
    `org:${organization}`,
    `created:>=${createdSince}`,
  ];

  return `https://api.github.com/search/issues?q=${qualifiers.join('+')}&sort=created&order=desc&per_page=100`;
}


/*
  Find pull requests that were merged or updated since some date
*/
export function filterMerged({ pullRequests, mergedSince }) {
  const startDate = moment(mergedSince);

  return pullRequests.filter(pullRequest => {
    const isMergedRecently = (pullRequest.closedAt >= startDate);

    return pullRequest.isMadeByUser && isMergedRecently;
  });
}

export function filterUpdated({ pullRequests, mergedSince }) {
  const startDate = moment(mergedSince);

  return pullRequests.filter(pullRequest => {
    const isMergedRecently = (pullRequest.closedAt >= startDate);
    const isUpdatedRecently = (pullRequest.updatedAt >= startDate);

    return pullRequest.isMadeByUser && !isMergedRecently && isUpdatedRecently;
  });
}