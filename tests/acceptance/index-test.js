import { click, currentURL, fillIn, findAll, visit } from '@ember/test-helpers';
import { a11yAudit } from 'ember-a11y-testing/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';
import setupPullRequestAssertions from 'whats-new-in-emberland/tests/helpers/pull-requests';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupPullRequestAssertions(hooks);

  test('When we visit the index route, we see the form for searching PRs', async function (assert) {
    await visit('/');

    assert
      .dom('[data-test-form="Search PRs"]')
      .exists({ count: 1 }, 'We see the form for searching pull requests.');
  });

  test('When we submit the form, we are redirected to the pull-requests route', async function (assert) {
    /*
      For this test, we don't care if the pull-requests route displays data.
      This is why we overrode the endpoint and set `items` (pull requests)
      to be an empty array.
    */
    let numFetchRequests = 0;

    this.server.get('https://api.github.com/search/issues', () => {
      numFetchRequests++;

      return {
        total_count: 0,
        incomplete_results: false,
        items: [],
      };
    });

    await visit('/');
    await fillIn('[data-test-field="Merged Since"]', '2020-09-14');
    await click('[data-test-button="Search"]');

    assert.strictEqual(
      currentURL(),
      '/pull-requests?mergedSince=2020-09-14',
      'We see the correct URL.'
    );

    assert.strictEqual(
      numFetchRequests,
      7,
      'We make 7 requests (corresponding to 7 repo organizations).'
    );
  });

  test('When we submit the form, we see merged PRs and updated PRs', async function (assert) {
    await visit('/');
    await fillIn('[data-test-field="Merged Since"]', '2020-09-14');
    await click('[data-test-button="Search"]');

    assert
      .dom('[data-test-header]')
      .hasText('Pull requests since 2020-09-14', 'We see the correct header.');

    // Check pull requests that have been merged
    const mergedPRs = findAll(
      '[data-test-section="Merged PRs"] [data-test-pull-request]'
    );

    assert.strictEqual(
      mergedPRs.length,
      7,
      'We see 7 pull requests that have been merged.'
    );

    assert.isPullRequestCorrect(mergedPRs[0], {
      title: {
        href: 'https://github.com/adopted-ember-addons/ember-electron/pull/589',
        text: 'Fix handle-file-urls on Windows',
      },
      author: {
        href: 'https://github.com/bendemboski',
        text: '@bendemboski',
      },
      repo: {
        href: 'https://github.com/adopted-ember-addons/ember-electron',
        text: 'adopted-ember-addons/ember-electron',
      },
    });

    assert.isPullRequestCorrect(mergedPRs[mergedPRs.length - 1], {
      title: {
        href: 'https://github.com/glimmerjs/glimmer.js/pull/305',
        text: 'chore: Update glimmer-vm packages',
      },
      author: {
        href: 'https://github.com/chadhietala',
        text: '@chadhietala',
      },
      repo: {
        href: 'https://github.com/glimmerjs/glimmer.js',
        text: 'glimmerjs/glimmer.js',
      },
    });

    // Check pull requests that have been updated (but not merged)
    const updatedPRs = findAll(
      '[data-test-section="Updated PRs"] [data-test-pull-request]'
    );

    assert.strictEqual(
      updatedPRs.length,
      16,
      'We see 16 pull requests that have been updated.'
    );

    assert.isPullRequestCorrect(updatedPRs[0], {
      title: {
        href:
          'https://github.com/adopted-ember-addons/ember-autoresize/pull/120',
        text: 'Use the native placeholder attribute if exists',
      },
      author: {
        href: 'https://github.com/BnitoBzh',
        text: '@BnitoBzh',
      },
      repo: {
        href: 'https://github.com/adopted-ember-addons/ember-autoresize',
        text: 'adopted-ember-addons/ember-autoresize',
      },
    });

    assert.isPullRequestCorrect(updatedPRs[updatedPRs.length - 1], {
      title: {
        href: 'https://github.com/glimmerjs/glimmer-vm/pull/1150',
        text: '[WIP] Refactor precompiler',
      },
      author: {
        href: 'https://github.com/wycats',
        text: '@wycats',
      },
      repo: {
        href: 'https://github.com/glimmerjs/glimmer-vm',
        text: 'glimmerjs/glimmer-vm',
      },
    });
  });

  test('Accessibility audit', async function (assert) {
    await visit('/');
    await a11yAudit();
    assert.ok(true);
  });
});
