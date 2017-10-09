import FactoryGuy from 'ember-data-factory-guy';
const sampleDate = new Date().toISOString();

FactoryGuy.define('github-repository', {
  sequences: {
    name: function(num) {
      return 'repository' + num;
    },
    full_name: function (i) {
      return `user1/repository${i}`;
    },
    html_url: function (i) {
      return `https://github.com/repos/user1/repository${i}`;
    },
    url: function (i) {
      return `https://api.github.com/repos/user1/repository${i}`;
    },
  },
  default: {
    description: 'This is a test repository',
    language: null,
    fork: true,
    private: true,
    created_at: sampleDate,
    updated_at: sampleDate,
    pushed_at: sampleDate,
    owner: { url: 'https://api.github.com/users/user1' },
    default_branch: 'branch1',
    pulls: FactoryGuy.hasMany('github-pull', { async: true }),
  }
});
