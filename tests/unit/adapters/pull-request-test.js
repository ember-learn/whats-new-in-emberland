import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Adapter | pull-request', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const adapter = this.owner.lookup('adapter:pull-request');

    assert.ok(adapter);
  });
});
