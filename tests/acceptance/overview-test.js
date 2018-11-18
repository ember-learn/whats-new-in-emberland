/* global Timecop */
import { skip, module } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { currentURL, find, visit } from '@ember/test-helpers';

module('Acceptance | Overview', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    Timecop.install();
  });

  hooks.afterEach(function() {
    Timecop.uninstall();
  });

  skip('visiting /overview - vist route', async function(assert) {
    await visit('/overview');
    assert.equal(currentURL(), '/overview');
  });

  skip('visiting /overview - week day disclaimers it\'s Thursday; passes with proper time setup', async function(assert) {
    Timecop.travel(new Date(2017, 9, 12, 11, 45)); // seems months are zero based....
    await visit('/overview');

    assert.equal(currentURL(), '/overview');
    assert.ok(find('[data-test-is-thursday-disclaimer]'), 'displays Thursday disclaimer');
    assert.notOk(find('[data-test-is-friday-disclaimer]'), 'doesn\'t display Friday disclaimer');
  });

  skip('visiting /overview - week day disclaimers it\'s Friday; passes with proper time setup', async function(assert) {
    Timecop.travel(new Date(2017, 9, 13, 11, 45)); // seems months are zero based....
    await visit('/overview');

    assert.equal(currentURL(), '/overview');
    assert.notOk(find('[data-test-is-thursday-disclaimer]'), 'doesn\'t display Thursday disclaimer');
    assert.equal(find('[data-test-is-friday-disclaimer]').textContent.trim(), 'RELEASE DAY!', 'displays Friday disclaimer');
  });

  skip('visiting /overview - week day disclaimers - fails on thu + fridays', async function(assert) {
    await visit('/overview');
    assert.equal(currentURL(), '/overview');
    assert.notOk(find('[data-test-is-thursday-disclaimer]'), 'doesn\'t display Thursday disclaimer');
    assert.notOk(find('[data-test-is-friday-disclaimer]'), 'doesn\'t display Friday disclaimer');
  });
});
