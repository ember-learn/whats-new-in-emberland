import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';

module('Integration | Component | copy me', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`
      <CopyMe>
        Lorem ipsum
      </CopyMe>
    `);

    assert.dom('[data-test-clipboard-text]')
      .hasText(
        'Lorem ipsum',
        'We see the correct clipboard text.'
      );

    assert.dom('[data-test-button="Copy to Clipboard"]')
      .hasText(
        'Copy to Clipboard',
        'We see the correct label for Copy to Clipboard button.'
      );
  });
});
