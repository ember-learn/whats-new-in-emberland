import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | pull-requests', function(hooks) {
  setupTest(hooks);


  test('identifyUsers works', function(assert) {
    const controller = this.owner.lookup('controller:pull-requests');

    const users = controller.identifyUsers([
      {
        html_url: 'https://github.com/zoey',
        login: 'zoey',
        type: 'User',
        url: 'https://api.github.com/zoey',
      },

      {
        html_url: 'https://github.com/apps/renovate',
        login: 'renovate[bot]',
        type: 'Bot',
        url: 'https://api.github.com/renovate',
      },

      {
        html_url: 'https://github.com/apps/dependabot',
        login: 'dependabot[bot]',
        type: 'Bot',
        url: 'https://api.github.com/dependabot',
      },

      {
        html_url: 'https://github.com/tomster',
        login: 'tomster',
        type: 'User',
        url: 'https://api.github.com/tomster',
      },

      {
        html_url: 'https://github.com/apps/dependabot-preview',
        login: 'dependabot-preview[bot]',
        type: 'Bot',
        url: 'https://api.github.com/dependabot-preview',
      },

      {
        html_url: 'https://github.com/zoey',
        login: 'zoey',
        type: 'User',
        url: 'https://api.github.com/zoey',
      },

      {
        html_url: 'https://github.com/apps/github-actions',
        login: 'github-actions[bot]',
        type: 'Bot',
        url: 'https://api.github.com/github-actions',
      },

      {
        html_url: 'https://github.com/emberjs',
        login: 'emberjs',
        type: 'User',
        url: 'https://api.github.com/emberjs',
      },
    ]);

    assert.deepEqual(
      users,
      [
        {
          handle: '@zoey',
          profileLink: 'https://github.com/zoey',
          url: 'https://api.github.com/zoey',
        },

        {
          handle: '@tomster',
          profileLink: 'https://github.com/tomster',
          url: 'https://api.github.com/tomster',
        },

        {
          handle: '@emberjs',
          profileLink: 'https://github.com/emberjs',
          url: 'https://api.github.com/emberjs',
        },
      ],
      'We can identify a unique list of users.'
    );
  });


  test('sortUsers works', function(assert) {
    const controller = this.owner.lookup('controller:pull-requests');

    const users = controller.sortUsers([
      {
        handle: '@zoey',
        profileLink: 'https://github.com/zoey'
      },

      {
        handle: '@tomster',
        profileLink: 'https://github.com/tomster'
      },

      {
        handle: '@emberjs',
        profileLink: 'https://github.com/emberjs'
      },
    ]);

    assert.deepEqual(
      users,
      [
        {
          handle: '@emberjs',
          profileLink: 'https://github.com/emberjs'
        },

        {
          handle: '@tomster',
          profileLink: 'https://github.com/tomster'
        },

        {
          handle: '@zoey',
          profileLink: 'https://github.com/zoey'
        },
      ],
      'We can sort users by their handle.'
    );
  });


  test('updateContributorsList works', function(assert) {
    const controller = this.owner.lookup('controller:pull-requests');

    controller.updateContributorsList([
      {
        handle: '@emberjs',
        profileLink: 'https://github.com/emberjs'
      },

      {
        handle: '@tomster',
        profileLink: 'https://github.com/tomster'
      },

      {
        handle: '@zoey',
        name: 'Zoey',
        profileLink: 'https://github.com/zoey'
      },
    ]);

    assert.strictEqual(
      controller.contributorsList,
        '<a href="https://github.com/emberjs" rel="noopener noreferrer" target="_blank">@emberjs</a>, <a href="https://github.com/tomster" rel="noopener noreferrer" target="_blank">@tomster</a>, and <a href="https://github.com/zoey" rel="noopener noreferrer" target="_blank">Zoey (@zoey)</a>'
      ,
      'We can update the contributors list.'
    );
  });

  test('addOxfordComma works', function (assert) {
    const controller = this.owner.lookup('controller:pull-requests');

    controller.updateContributorsList([]);
    assert.strictEqual(
      controller.contributorsList,
        ''
      ,
      'We return an empty string for no contributors.'
    );

    controller.updateContributorsList([
      {
        handle: '@emberjs',
        profileLink: 'https://github.com/emberjs'
      }
    ]);
    assert.strictEqual(
      controller.contributorsList,
        '<a href="https://github.com/emberjs" rel="noopener noreferrer" target="_blank">@emberjs</a>'
      ,
      'We don’t add a comma for a single contributor.'
    );

    controller.updateContributorsList([
      {
        handle: '@emberjs',
        profileLink: 'https://github.com/emberjs'
      },
      {
        handle: '@tomster',
        profileLink: 'https://github.com/tomster'
      },
    ]);
    assert.strictEqual(
      controller.contributorsList,
      '<a href="https://github.com/emberjs" rel="noopener noreferrer" target="_blank">@emberjs</a> and <a href="https://github.com/tomster" rel="noopener noreferrer" target="_blank">@tomster</a>'
      ,
      'We don’t add an oxford comma for 2 contributors.'
    );

    controller.updateContributorsList([
      {
        handle: '@emberjs',
        profileLink: 'https://github.com/emberjs'
      },
      {
        handle: '@tomster',
        profileLink: 'https://github.com/tomster'
      },
      {
        handle: '@zoey',
        name: 'Zoey',
        profileLink: 'https://github.com/zoey'
      }
    ]);
    assert.strictEqual(
      controller.contributorsList,
      '<a href="https://github.com/emberjs" rel="noopener noreferrer" target="_blank">@emberjs</a>, <a href="https://github.com/tomster" rel="noopener noreferrer" target="_blank">@tomster</a>, and <a href="https://github.com/zoey" rel="noopener noreferrer" target="_blank">Zoey (@zoey)</a>'
      ,
      'We add an oxford comma for 3+ contributors.'
    );

  })
});
