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