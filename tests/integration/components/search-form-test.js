import { click, fillIn, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { mostRecentSaturday } from 'whats-new-in-emberland/utils/pull-request';

module('Integration | Component | search-form', function (hooks) {
  setupRenderingTest(hooks);

  test('renders a form', async function (assert) {
    await render(hbs`
      <SearchForm />
    `);

    assert.dom('[data-test-form="Search PRs"]').exists('We can see the form.');

    assert
      .dom('[data-test-field="Merged Since"]')
      .exists('We can see the input field for Merged Since.')
      .hasAttribute('type', 'date', 'The input field has the type of date.')
      .hasValue(
        mostRecentSaturday.format('YYYY-MM-DD'),
        'The input field shows the default value.'
      );

    assert
      .dom('[data-test-button="Search"]')
      .exists('We can see the Search button.')
      .hasAttribute('type', 'submit', 'The button has the type of submit.');
  });

  test('sends the default mergedSince when we submit form without change', async function (assert) {
    assert.expect(1);

    this.onSubmit = ({ mergedSince }) => {
      assert.strictEqual(
        mergedSince,
        mostRecentSaturday.format('YYYY-MM-DD'),
        'We get the correct value for mergedSince.'
      );
    };

    await render(hbs`
      <SearchForm
        @onSubmit={{this.onSubmit}}
      />
    `);

    await click('[data-test-button="Search"]');
  });

  test('sends the updated mergedSince when we submit form after changing mergedSince', async function (assert) {
    assert.expect(2);

    this.onSubmit = ({ mergedSince }) => {
      assert.strictEqual(
        mergedSince,
        '2020-08-29',
        'We get the correct value for mergedSince.'
      );
    };

    await render(hbs`
      <SearchForm
        @onSubmit={{this.onSubmit}}
      />
    `);

    await fillIn('[data-test-field="Merged Since"]', '2020-08-29');

    assert
      .dom('[data-test-field="Merged Since"]')
      .hasValue('2020-08-29', 'The input field shows the new value.');

    await click('[data-test-button="Search"]');
  });
});
