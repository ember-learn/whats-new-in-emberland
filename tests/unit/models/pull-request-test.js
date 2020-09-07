import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Unit | Model | pull-request', function(hooks) {
  setupTest(hooks);


  test('isMadeByUser', function(assert) {
    const store = this.owner.lookup('service:store');

    const pullRequest1 = store.createRecord('pull-request', {
      user: {
        htmlUrl: 'https://github.com/zoey',
        login: 'zoey',
        type: 'User',
        url: 'https://api.github.com/zoey',
      }
    });

    const pullRequest2 = store.createRecord('pull-request', {
      user: {
        htmlUrl: 'https://github.com/apps/renovate',
        login: 'renovate[bot]',
        type: 'Bot',
        url: 'https://api.github.com/renovate',
      }
    });

    assert.strictEqual(
      pullRequest1.isMadeByUser,
      true,
      'returns true if the user\'s type is User.'
    );

    assert.strictEqual(
      pullRequest2.isMadeByUser,
      false,
      'returns false if the user\'s type is Bot.'
    );
  });


  test('repositoryName', function(assert) {
    const store = this.owner.lookup('service:store');

    const pullRequest1 = store.createRecord('pull-request', {
      htmlUrl: 'https://github.com/ember-learn/whats-new-in-emberland/pull/37'
    });

    const pullRequest2 = store.createRecord('pull-request', {
      htmlUrl: undefined
    });

    assert.strictEqual(
      pullRequest1.repositoryName,
      'ember-learn/whats-new-in-emberland',
      'returns organization and repository names if htmlUrl can be parsed.'
    );

    assert.strictEqual(
      pullRequest2.repositoryName,
      '',
      'returns an empty string if htmlUrl can\'t be parsed.'
    );
  });


  test('repositoryUrl', function(assert) {
    const store = this.owner.lookup('service:store');

    const pullRequest1 = store.createRecord('pull-request', {
      htmlUrl: 'https://github.com/ember-learn/whats-new-in-emberland/pull/37'
    });

    const pullRequest2 = store.createRecord('pull-request', {
      htmlUrl: undefined
    });

    assert.strictEqual(
      pullRequest1.repositoryUrl,
      'https://github.com/ember-learn/whats-new-in-emberland',
      'returns repository URL if htmlUrl can be parsed.'
    );

    assert.strictEqual(
      pullRequest2.repositoryUrl,
      'https://github.com/',
      'returns GitHub homepage URL if htmlUrl can\'t be parsed.'
    );
  });
});
