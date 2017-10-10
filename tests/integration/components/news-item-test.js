import { moduleForComponent, skip, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, click } from 'ember-native-dom-helpers';
import wait from 'ember-test-helpers/wait';
import { run, later } from '@ember/runloop';

import { timeout } from 'ember-concurrency';
import td from 'testdouble';
import lolex from 'lolex';

import { make, makeList, manualSetup } from 'ember-data-factory-guy';

moduleForComponent('news-item', 'Integration | Component | news item', {
  integration: true,
  beforeEach() {
    manualSetup(this.container);
    this.dummyPull = make('github-pull');
    this.dummyRepo = make('github-repository');
    const commentsNum = 2;
    this.comments = makeList('github-comment', commentsNum);
    this.clock = lolex.createClock();
  },
});

skip('it renders: synchronous comment loading check with async / await', async function(assert) {
  this.set('pull', this.dummyPull);
  this.set('repo', this.dummyRepo);
  $.getJSON = td.function();

  td.when($.getJSON('https://api.github.com/repos/user1/repository/pulls/1/comments')).thenResolve(this.comments);

  this.render(hbs`{{news-item pull=pull repo=repo}}`);
  assert.ok(find('[data-test-pull-title]').textContent.includes('Finally fixing Bug #1'), 'displays pull request title');
  assert.ok(find('[data-test-pull-desc]').textContent.includes('Some text for my pull request 1'), 'displays pull request description');

  await click('[data-test-load-comments]'); // already returns wait helper

  assert.equal(find('[data-test-num-of-comments]').textContent.trim(), `2`, 'displays comments');
});

skip('it renders: comment loading check with wait helper', async function(assert) {
  this.set('pull', this.dummyPull);
  this.set('repo', this.dummyRepo);

  /* const $ = {
    getJSON() {},
  }; */
  $.getJSON = td.function();

  td.when($.getJSON('https://api.github.com/repos/user1/repository/pulls/1/comments')).thenResolve(this.comments);

  this.render(hbs`{{news-item pull=pull repo=repo}}`);
  assert.ok(find('[data-test-pull-title]').textContent.includes('Finally fixing Bug #1'), 'displays pull request title');
  assert.ok(find('[data-test-pull-desc]').textContent.includes('Some text for my pull request 1'), 'displays pull request description');

  click('[data-test-load-comments]');

  return wait().then(() => {
    assert.equal(find('[data-test-num-of-comments]').textContent.trim(), `2`, 'displays comments');
  });
});

skip('it renders: comment loading with concurrency task - times out', async function(assert) {
  this.set('pull', this.dummyPull);
  this.set('repo', this.dummyRepo);

  /* const $ = {
    getJSON() {},
  }; */
  $.getJSON = td.function();

  td.when($.getJSON('https://api.github.com/repos/user1/repository/pulls/1/comments')).thenResolve(this.comments);

  this.render(hbs`{{news-item pull=pull repo=repo}}`);
  assert.ok(find('[data-test-pull-title]').textContent.includes('Finally fixing Bug #1'), 'displays pull request title');
  assert.ok(find('[data-test-pull-desc]').textContent.includes('Some text for my pull request 1'), 'displays pull request description');

  return wait().then(() => {
    assert.equal(find('[data-test-num-of-comments]').textContent.trim(), `2`, 'displays comments');
  });
});

test('it renders: comment loading with concurrency task - pass w/ cancelTimers', async function(assert) {
  this.set('pull', this.dummyPull);
  this.set('repo', this.dummyRepo);

//  run(() => {
  /*  this.clock.setTimeout(function () {
      run.cancelTimers();
    }, 200); */
//  });

  later(() => {
    run.cancelTimers();
  }, 200);

  $.getJSON = td.function();

  td.when($.getJSON('https://api.github.com/repos/user1/repository/pulls/1/comments')).thenResolve(this.comments);

  this.render(hbs`{{news-item pull=pull repo=repo}}`);
  assert.ok(find('[data-test-pull-title]').textContent.includes('Finally fixing Bug #1'), 'displays pull request title');
  assert.ok(find('[data-test-pull-desc]').textContent.includes('Some text for my pull request 1'), 'displays pull request description');

  await this.clock.tick(200);

  return wait().then(() => { // will timeout without cancelled timer
    assert.equal(find('[data-test-num-of-comments]').textContent.trim(), `2`, 'displays comments');
    assert.equal(find('[data-test-times-reloaded]').textContent.trim(), `7x`, 'loaded comments 10 times'); // undeterministic, might return any other number
  });
});

skip('it renders: comment loading with concurrency task - pass w/ with waitingHelper ????', async function(assert) {
  this.set('pull', this.dummyPull);
  this.set('repo', this.dummyRepo);

  $.getJSON = td.function();

  td.when($.getJSON('https://api.github.com/repos/user1/repository/pulls/1/comments')).thenResolve(this.comments);

  this.render(hbs`{{news-item pull=pull repo=repo}}`);
  assert.ok(find('[data-test-pull-title]').textContent.includes('Finally fixing Bug #1'), 'displays pull request title');
  assert.ok(find('[data-test-pull-desc]').textContent.includes('Some text for my pull request 1'), 'displays pull request description');

  click('.load-comments');

  assert.equal(find('[data-test-num-of-comments]').textContent.trim(), `2`, 'displays comments');
});
