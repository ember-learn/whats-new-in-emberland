import { Response } from 'miragejs';
import getPullRequests from './data/pull-requests';
import getUser from './data/users';
import { discoverEmberDataModels } from 'ember-cli-mirage';
import { createServer } from 'miragejs';

export default function (config) {
  let finalConfig = {
    ...config,
    models: {
      ...discoverEmberDataModels(config.store),
      ...config.models,
    },
    routes,
  };

  return createServer(finalConfig);
}

function routes() {
  this.get('https://api.github.com/search/issues', (schema, request) => {
    const qualifiersMap = getQualifiersMap(request.queryParams);
    const organization = qualifiersMap.get('org');

    const pullRequests = getPullRequests(organization) ?? [];

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
      return new Response(
        500,
        {},
        {
          errors: [`Please create the user data. (username: ${username})`],
        },
      );
    }

    return user;
  });
}

function getQualifiersMap(queryParams) {
  const qualifiers = queryParams.q.split(/\s+/);

  const qualifiersMap = qualifiers.reduce((accumulator, qualifier) => {
    const [key, value] = qualifier.split(':');

    accumulator.set(key, value);

    return accumulator;
  }, new Map());

  return qualifiersMap;
}
