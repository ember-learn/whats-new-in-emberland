import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { findAll, render } from '@ember/test-helpers';

module('Integration | Component | pull-requests', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.pullRequests = [
      {
        htmlUrl: 'https://github.com/ember-learn/whats-new-in-emberland/pull/37',
        repositoryName: 'ember-learn/whats-new-in-emberland',
        repositoryUrl: 'https://github.com/ember-learn/whats-new-in-emberland',
        title: 'Upgraded app to Ember Octane',
        user: {
          login: 'zoey'
        }
      },
      {
        htmlUrl: 'https://github.com/ember-learn/whats-new-in-emberland/pull/39',
        repositoryName: 'ember-learn/whats-new-in-emberland',
        repositoryUrl: 'https://github.com/ember-learn/whats-new-in-emberland',
        title: 'Documented how to locally run the app',
        user: {
          login: 'tomster'
        }
      }
    ];

    await render(hbs`
      {{pull-requests
        pullRequests=this.pullRequests
      }}
    `);

    const pullRequests = findAll('[data-test-pull-request]');

    assert.strictEqual(pullRequests.length, 2, 'We see 2 pull requests.');

    assert.dom('[data-test-field="Title"]', pullRequests[0])
      .hasText(
        'Upgraded app to Ember Octane',
        'We see the correct title for the 1st pull request.'
      );

    assert.dom('[data-test-field="Title"]', pullRequests[1])
      .hasText(
        'Documented how to locally run the app',
        'We see the correct title for the 2nd pull request.'
      );
  });
});
