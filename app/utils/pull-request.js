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
export function buildUrlForSearchingPRs(organization, createdSince = mostRecentSaturday) {
  const qualifiers = [
    'is:pr',
    `org:${organization}`,
    `created:>=${createdSince.format('YYYY-MM-DD')}`,
  ];

  return `https://api.github.com/search/issues?q=${qualifiers.join('+')}&sort=created&order=desc`;
}


/*
  Define pull requests that are merged or new
*/
export function filterMerged(pullRequests) {
  return pullRequests.filter(pullRequest => {
    const { isMadeByUser, isMergedThisWeek } = pullRequest;

    return isMadeByUser && isMergedThisWeek;
  });
}

export function filterNew(pullRequests) {
  return pullRequests.filter(pullRequest => {
    const { isMadeByUser, isMergedThisWeek, isNewThisWeek } = pullRequest;

    return isMadeByUser && isNewThisWeek && !isMergedThisWeek;
  });
}