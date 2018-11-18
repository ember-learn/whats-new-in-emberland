import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import moment from 'moment';

module('Unit | Route | index', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.route = this.owner.lookup('route:index');
  });

  hooks.afterEach(function() {
    this.route.set('dateKey', null);
  });

  test('currentDate will return an arbitrary date if the dateKey is set', function(assert) {
    // a week for the Ember Times starts on a Saturday and ends on Friday night (UTC)

    this.route.set('dateKey', moment(new Date(2018, 10, 17, 11, 45))); // a Saturday
    assert.equal(this.route.get('currentDate').format("YYYY MMM DD, dddd"), '2018 Nov 17, Saturday');
  });

  test('it returns the correct start of the week (Saturday)', function(assert) {
    // a week for the Ember Times starts on a Saturday and ends on Friday night (UTC)

    this.route.set('dateKey', moment(new Date(2018, 10, 17, 11, 45))); // a Saturday
    assert.equal(this.route.get('currentDate').format("YYYY MMM DD, dddd"), '2018 Nov 17, Saturday');
    assert.equal(this.route.get('startOfWeek').format("YYYY MMM DD, dddd"), '2018 Nov 17, Saturday');
  });

  test('it returns the correct start of the week (Sunday)', function(assert) {
    // a week for the Ember Times starts on a Saturday and ends on Friday night (UTC)

    this.route.set('dateKey', moment(new Date(2018, 10, 18, 11, 45))); // a Sunday
    assert.equal(this.route.get('currentDate').format("YYYY MMM DD, dddd"), '2018 Nov 18, Sunday');
    assert.equal(this.route.get('startOfWeek').format("YYYY MMM DD, dddd"), '2018 Nov 17, Saturday');
  });

  test('it returns the correct start of the week (Monday)', function(assert) {
    // a week for the Ember Times starts on a Saturday and ends on Friday night (UTC)

    this.route.set('dateKey', moment(new Date(2018, 10, 19, 11, 45))); // a Monday
    assert.equal(this.route.get('currentDate').format("YYYY MMM DD, dddd"), '2018 Nov 19, Monday');
    assert.equal(this.route.get('startOfWeek').format("YYYY MMM DD, dddd"), '2018 Nov 17, Saturday');
  });

  test('it returns the correct start of the week (Tuesday)', function(assert) {
    // a week for the Ember Times starts on a Saturday and ends on Friday night (UTC)

    this.route.set('dateKey', moment(new Date(2018, 10, 20, 11, 45))); // a Tuesday
    assert.equal(this.route.get('currentDate').format("YYYY MMM DD, dddd"), '2018 Nov 20, Tuesday');
    assert.equal(this.route.get('startOfWeek').format("YYYY MMM DD, dddd"), '2018 Nov 17, Saturday');
  });

  test('it returns the correct start of the week (Wednesday)', function(assert) {
    // a week for the Ember Times starts on a Saturday and ends on Friday night (UTC)

    this.route.set('dateKey', moment(new Date(2018, 10, 21, 11, 45))); // a Wednesday
    assert.equal(this.route.get('currentDate').format("YYYY MMM DD, dddd"), '2018 Nov 21, Wednesday');
    assert.equal(this.route.get('startOfWeek').format("YYYY MMM DD, dddd"), '2018 Nov 17, Saturday');
  });

  test('it returns the correct start of the week (Thursday)', function(assert) {
    // a week for the Ember Times starts on a Saturday and ends on Friday night (UTC)

    this.route.set('dateKey', moment(new Date(2018, 10, 22, 11, 45))); // a Thursday
    assert.equal(this.route.get('currentDate').format("YYYY MMM DD, dddd"), '2018 Nov 22, Thursday');
    assert.equal(this.route.get('startOfWeek').format("YYYY MMM DD, dddd"), '2018 Nov 17, Saturday');
  });

  test('it returns the correct start of the week (Friday)', function(assert) {
    // a week for the Ember Times starts on a Saturday and ends on Friday night (UTC)

    this.route.set('dateKey', moment(new Date(2018, 10, 23, 11, 45))); // a Friday
    assert.equal(this.route.get('currentDate').format("YYYY MMM DD, dddd"), '2018 Nov 23, Friday');
    assert.equal(this.route.get('startOfWeek').format("YYYY MMM DD, dddd"), '2018 Nov 17, Saturday');
  });
});
