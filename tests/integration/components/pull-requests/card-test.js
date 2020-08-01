import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | pull-requests/card', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.pr = {
      title: 'Upgraded app to Ember Octane',
      htmlUrl: 'https://github.com/ember-learn/whats-new-in-emberland/pull/37',
      userLogin: 'zoey'
    };

    await render(hbs`
      <PullRequests::Card @pr={{this.pr}} />
    `);

    assert.dom('[data-test-field="Title"]')
      .hasText(
        'Upgraded app to Ember Octane',
        'We see the correct title.'
      );

    assert.dom('[data-test-field="Title"]')
      .hasAttribute(
        'href',
        'https://github.com/ember-learn/whats-new-in-emberland/pull/37',
        'We see the correct link to the PR.'
      );

    assert.dom('[data-test-field="Author"]')
      .hasText(
        '@zoey',
        'We see the correct author.'
      );

    assert.dom('[data-test-field="Author"]')
      .hasAttribute(
        'href',
        'https://github.com/zoey',
        'We see the correct link to the author\'s GitHub page.'
      );
  });
});
