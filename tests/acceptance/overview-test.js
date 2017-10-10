import { skip, test } from 'qunit';
import moduleForAcceptance from 'whats-new-in-emberland/tests/helpers/module-for-acceptance';

import { find } from 'ember-native-dom-helpers';

moduleForAcceptance('Acceptance | overview');

skip('visiting /overview - vist route', function(assert) {
 let router = this.application.__container__.lookup('router:main');
 // location has to be setup via app.boot before the other helper functions like currentURL can be used
 // visit('/');
 // router.transitionTo('overview');
 visit('/overview');

  andThen(function() {
    assert.equal(currentURL(), '/overview');
  });
});

skip('visiting /overview - week day disclaimers it\'s Thursday; passes with proper time setup', async function(assert) {
  let router = this.application.__container__.lookup('router:main');
  Timecop.install();
  Timecop.travel(new Date(2017, 9, 12, 11, 45)); // seems months are zero based....
  // location has to be setup via app.boot before the other helper functions like currentURL can be used
  // visit('/');
  // router.transitionTo('overview');
  await visit('/overview');

  andThen(function() {
    assert.equal(currentURL(), '/overview');
    assert.ok(find('[data-test-is-thursday-disclaimer]'), 'displays Thursday disclaimer');
    assert.notOk(find('[data-test-is-friday-disclaimer]'), 'doesn\'t display Friday disclaimer');
    Timecop.uninstall();
  });
});

test('visiting /overview - week day disclaimers it\'s Friday; passes with proper time setup', async function(assert) {
  let router = this.application.__container__.lookup('router:main');
  Timecop.install();
  Timecop.travel(new Date(2017, 9, 13, 11, 45)); // seems months are zero based....
  // location has to be setup via app.boot before the other helper functions like currentURL can be used
  // visit('/');
  // router.transitionTo('overview');
  await visit('/overview');

  andThen(function() {
    assert.equal(currentURL(), '/overview');
    assert.notOk(find('[data-test-is-thursday-disclaimer]'), 'doesn\'t display Thursday disclaimer');
    assert.equal(find('[data-test-is-friday-disclaimer]').textContent.trim(), 'RELEASE DAY!', 'displays Friday disclaimer');
    Timecop.uninstall();
  });
});

skip('visiting /overview - week day disclaimers - fails on thu + fridays', function(assert) {
 let router = this.application.__container__.lookup('router:main');
 // location has to be setup via app.boot before the other helper functions like currentURL can be used
 // visit('/');
 // router.transitionTo('overview');
 visit('/overview');

  andThen(function() {
    assert.equal(currentURL(), '/overview');
    assert.notOk(find('[data-test-is-thursday-disclaimer]'), 'doesn\'t display Thursday disclaimer');
    assert.notOk(find('[data-test-is-friday-disclaimer]'), 'doesn\'t display Friday disclaimer');
  });
});
