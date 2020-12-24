import { click, findAll, settled, visit } from '@ember/test-helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';
import setupPullRequestAssertions from 'whats-new-in-emberland/tests/helpers/pull-requests';


module('Acceptance | pull-requests', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupPullRequestAssertions(hooks);


  test('When we visit the pull-requests route without the query parameter mergedSince, we see 0 merged PRs and 0 updated PRs', async function(assert) {
    await visit('/pull-requests');

    assert.dom('[data-test-header]')
      .hasText(
        'Pull requests since',
        'We see the correct header.'
      );


    // Check pull requests that have been merged
    const mergedPRs = findAll('[data-test-section="Merged PRs"] [data-test-pull-request]');

    assert.strictEqual(
      mergedPRs.length,
      0,
      'We see 0 pull requests that have been merged.'
    );


    // Check pull requests that have been updated (but not merged)
    const updatedPRs = findAll('[data-test-section="Updated PRs"] [data-test-pull-request]');

    assert.strictEqual(
      updatedPRs.length,
      0,
      'We see 0 pull requests that have been updated.'
    );
  });


  test('When we visit the pull-requests route with the query parameter mergedSince, we see merged PRs and updated PRs', async function(assert) {
    await visit('/pull-requests?mergedSince=2020-09-14');

    assert.dom('[data-test-header]')
      .hasText(
        'Pull requests since 2020-09-14',
        'We see the correct header.'
      );


    // Check pull requests that have been merged
    const mergedPRs = findAll('[data-test-section="Merged PRs"] [data-test-pull-request]');

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
    const updatedPRs = findAll('[data-test-section="Updated PRs"] [data-test-pull-request]');

    assert.strictEqual(
      updatedPRs.length,
      16,
      'We see 16 pull requests that have been updated.'
    );

    assert.isPullRequestCorrect(updatedPRs[0], {
      title: {
        href: 'https://github.com/adopted-ember-addons/ember-autoresize/pull/120',
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


  test('When we click the Get Contributors List button, we see the list of contributors', async function(assert) {
    await visit('/pull-requests?mergedSince=2020-09-14');
    await click('[data-test-button="Get Contributors List"]');

    // eslint-disable-next-line ember/no-settled-after-test-helper
    await settled();

    assert.dom('[data-test-clipboard-text]')
      .includesText('Ben Demboski (@bendemboski)', 'We see Ben Demboski.')
      .includesText('Chad Hietala (@chadhietala)', 'We see Chad Hietala.')
      .includesText('Cory Loken (@cloke)', 'We see Cory Loken')
      .includesText('Robert Jackson (@rwjblue)', 'We see Robert Jackson.');
  });
});
