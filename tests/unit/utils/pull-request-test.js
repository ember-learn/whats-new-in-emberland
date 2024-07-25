import { module, test } from 'qunit';
import {
  buildUrlForSearchingPRs,
  filterMerged,
  filterUpdated,
  sortPullRequests,
} from 'whats-new-in-emberland/utils/pull-request';

module('Unit | Utility | pull-request', function () {
  test('buildUrlForSearchingPRs works', function (assert) {
    assert.strictEqual(
      buildUrlForSearchingPRs('ember-learn', '2020-08-01'),
      'https://api.github.com/search/issues?q=is:pr+org:ember-learn+created:>=2020-08-01&sort=created&order=desc&per_page=100',
      'We return the correct URL.',
    );
  });

  module('Filtering and sorting pull requests', function (hooks) {
    hooks.beforeEach(function () {
      this.pullRequests = [
        {
          id: 1,
          repositoryName: 'adopted-ember-addons/ember-sortable',
          createdAt: new Date('2020-09-03'),
          updatedAt: null,
          closedAt: null,
          isMadeByUser: true,
        },

        {
          id: 2,
          repositoryName: 'ember-cli/ember-cli',
          createdAt: new Date('2020-08-25'),
          updatedAt: new Date('2020-09-12'),
          closedAt: null,
          isMadeByUser: true,
        },

        {
          id: 3,
          repositoryName: 'glimmerjs/glimmer.js',
          createdAt: new Date('2020-08-25'),
          updatedAt: new Date('2020-09-12'),
          closedAt: null,
          isMadeByUser: false,
        },

        {
          id: 4,
          repositoryName: 'adopted-ember-addons/ember-sortable',
          createdAt: new Date('2020-09-14'),
          updatedAt: new Date('2020-09-14'),
          closedAt: new Date('2020-09-14'),
          isMadeByUser: true,
        },

        {
          id: 5,
          repositoryName: 'glimmerjs/glimmer.js',
          createdAt: new Date('2020-09-14'),
          updatedAt: new Date('2020-09-14'),
          closedAt: new Date('2020-09-14'),
          isMadeByUser: false,
        },

        {
          id: 6,
          repositoryName: 'emberjs/ember-qunit',
          createdAt: new Date('2020-08-11'),
          updatedAt: new Date('2020-08-26'),
          closedAt: new Date('2020-08-27'),
          isMadeByUser: true,
        },

        {
          id: 7,
          repositoryName: 'ember-learn/ember-blog',
          createdAt: new Date('2020-08-11'),
          updatedAt: new Date('2020-08-26'),
          closedAt: new Date('2020-09-02'),
          isMadeByUser: true,
        },
      ];
    });

    test('filterMerged works', function (assert) {
      const filteredPRs = filterMerged({
        pullRequests: this.pullRequests,
        mergedSince: '2020-09-01',
      });

      assert.deepEqual(
        filteredPRs.map(({ id }) => id),
        [4, 7],
        'We return the pull requests that have been merged since the input date.',
      );
    });

    test('filterUpdated works', function (assert) {
      const filteredPRs = filterUpdated({
        pullRequests: this.pullRequests,
        mergedSince: '2020-09-01',
      });

      assert.deepEqual(
        filteredPRs.map(({ id }) => id),
        [2],
        'We return the pull requests that have been updated (but not merged) since the input date.',
      );
    });

    test('sortPullRequests works', function (assert) {
      const sortedPRs = sortPullRequests(this.pullRequests);

      assert.deepEqual(
        sortedPRs.map(({ id }) => id),
        [4, 1, 2, 7, 6, 5, 3],
        'Pull requests are sorted by repositoryName, then by createdAt.',
      );
    });
  });
});
