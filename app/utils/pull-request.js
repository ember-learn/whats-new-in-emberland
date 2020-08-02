import moment from 'moment';

/*
  Find the most recent Saturday, the day after we publish a Times issue
*/
const currentDay = moment().day();
const index = (currentDay < 6) ? -1 : 6;

export const beginningOfSaturday = moment().day(index).startOf('day');

export function buildUrlForSearchingPRs(organization, createdSince = beginningOfSaturday) {
  return `https://api.github.com/search/issues?q=is:pr+org:${organization}+created:>=${createdSince.format('YYYY-MM-DD')}`;
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