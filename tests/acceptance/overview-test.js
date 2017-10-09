import { test } from 'qunit';
import moduleForAcceptance from 'whats-new-in-emberland/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | overview');

test('visiting /overview', function(assert) {
 console.log(this);
 console.log(Object.keys(this));
 let router = this.application.__container__.lookup('router:main');
 console.log(router);
 // location has to be setup via app.boot before the other helper functions like currentURL can be used
 // visit('/');
 // router.transitionTo('overview');
 visit('/overview');

  andThen(function() {
    assert.equal(currentURL(), '/overview');
  });
});
