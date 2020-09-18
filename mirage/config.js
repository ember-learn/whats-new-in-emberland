import { Response } from 'ember-cli-mirage';
import getPullRequests from './data/pull-requests';
import getUser from './data/users';


export default function() {
  this.get('https://api.github.com/search/issues', (schema, request) => {
    const qualifiersMap = getQualifiersMap(request.queryParams);
    const organization = qualifiersMap.get('org');

    const pullRequests = getPullRequests(organization);

    if (!pullRequests) {
      return new Response(500, {}, {
        errors: [
          `Please create the pull requests data. (organization: ${organization})`,
        ]
      });
    }

    return {
      total_count: pullRequests.length,
      incomplete_results: false,
      items: pullRequests,
    };
  });


  this.get('https://api.github.com/users/:username', (schema, request) => {
    const { username } = request.params;
    const user = getUser(username);

    if (!user) {
      return new Response(500, {}, {
        errors: [
          `Please create the user data. (username: ${username})`,
        ]
      });
    }

    return user;
  });
}


function getQualifiersMap(queryParams) {
  const qualifiers = queryParams.q.split(/\s+/);

  const qualifiersMap = qualifiers.reduce((accumulator, qualifier) => {
    const [ key, value ] = qualifier.split(':');

    accumulator.set(key, value);

    return accumulator;

  }, new Map());

  return qualifiersMap;
}
