import dayjs from 'dayjs';

const currentDay = dayjs().day();
const index = (currentDay < 6) ? -1 : 6;

export const mostRecentSaturday = dayjs().day(index).startOf('day');


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
  const startDate = dayjs(mergedSince);

  return pullRequests.filter(pullRequest => {
    const isMergedRecently = (pullRequest.closedAt >= startDate);

    return pullRequest.isMadeByUser && isMergedRecently;
  });
}

export function filterUpdated({ pullRequests, mergedSince }) {
  const startDate = dayjs(mergedSince);

  return pullRequests.filter(pullRequest => {
    const isMergedRecently = (pullRequest.closedAt >= startDate);
    const isUpdatedRecently = (pullRequest.updatedAt >= startDate);

    return pullRequest.isMadeByUser && !isMergedRecently && isUpdatedRecently;
  });
}


export function sortPullRequests(pullRequests) {
  return pullRequests.sort((a, b) => {
    // Alphabetical order
    if (a.repositoryName > b.repositoryName) return 1;
    if (a.repositoryName < b.repositoryName) return -1;

    // Reverse chronological order
    if (a.createdAt < b.createdAt) return 1;
    if (a.createdAt > b.createdAt) return -1;

    return 0;
  });
}


/*
  Use Fisher-Yates shuffle to randomly order array elements.

  Source: https://javascript.info/task/shuffle
*/
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Random index between 0 and i
    const j = Math.floor((i + 1) * Math.random());

    // Swap i-th and j-th elements
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}