import FactoryGuy from 'ember-data-factory-guy';
const sampleDate = new Date().toISOString();

FactoryGuy.define('github-user', {
  sequences: {
    login: function (i) {
      return `user${i}`;
    },
    name: function (i) {
      return `User ${i}`;
    },
    avatar_url: function (i) {
      return `user${i}-avatar.gif`;
    },
    repos_url: function (i) {
      return `https://api.github.com/users/user${i}/repos`;
    },
    url: function (i) {
      return `https://api.github.com/users/user${i}`;
    },
  },
  default: {
    type: 'github-user',
    public_repos: 1,
    public_gists: 2,
    followers: 3,
    following: 4,
    created_at: sampleDate,
    updated_at: sampleDate,
  }
});
