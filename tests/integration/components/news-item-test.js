import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { find, click } from 'ember-native-dom-helpers';
import wait from 'ember-test-helpers/wait';

import { timeout } from 'ember-concurrency';
import td from 'testdouble';

import FactoryGuy, { make, makeList, manualSetup } from 'ember-data-factory-guy';

moduleForComponent('news-item', 'Integration | Component | news item', {
  integration: true,
  beforeEach() {
    manualSetup(this.container);
    this.dummyPull = make('github-pull');
    this.dummyRepo = make('github-repository');
  },
});

test('it renders: synchronous comment loading check', async function(assert) {
  this.set('pull', this.dummyPull);
  this.set('repo', this.dummyRepo);
  $.getJSON = td.function();
  const commentsNum = 2;
  const comments = makeList('github-comment', commentsNum);
  td.when($.getJSON('https://api.github.com/repos/user1/repository/pulls/1/comments')).thenResolve(comments);

  this.render(hbs`{{news-item pull=pull repo=repo}}`);
  assert.ok(find('[data-test-pull-title]').textContent.includes('Finally fixing Bug #1'), 'displays pull request title');
  assert.ok(find('[data-test-pull-desc]').textContent.includes('Some text for my pull request 1'), 'displays pull request description');

  await click('.load-comments'); // already returns wait helper

  assert.equal(find('[data-test-num-of-comments]').textContent.trim(), `${commentsNum}`, 'displays comments');
});

test('it renders: asynchronous comment loading check', async function(assert) {
  this.set('pull', this.dummyPull);
  this.set('repo', this.dummyRepo);
  const commentsNum = 2;
  const comments = makeList('github-comment', commentsNum);

  this.set('setLoadingIcon', (pull) => {
    this.set('isLoadingComments', false);
    this.set('comments', comments);
  });
  $.getJSON = td.function();

  td.when($.getJSON('https://api.github.com/repos/user1/repository/pulls/1/comments')).thenResolve(comments);

  this.render(hbs`{{news-item pull=pull repo=repo}}`);
  assert.ok(find('[data-test-pull-title]').textContent.includes('Finally fixing Bug #1'), 'displays pull request title');
  assert.ok(find('[data-test-pull-desc]').textContent.includes('Some text for my pull request 1'), 'displays pull request description');

  //await timeout(40000);
  click('.load-comments');

  return wait().then(() => {
    assert.equal(find('[data-test-num-of-comments]').textContent.trim(), `${commentsNum}`, 'displays comments');
  });
});
