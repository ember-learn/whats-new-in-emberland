import FactoryGuy from 'ember-data-factory-guy';
const sampleDate = new Date().toISOString();

FactoryGuy.define('github-pull', {
  sequences: {
    number: function(num) {
      return num;
    },
    title: function(num) {
      return `Finally fixing Bug #${num}`;
    },
    body: function (i) {
      return `Some text for my pull request ${i}`;
    },
    html_url: function (i) {
      return `https://github.com/repos/user1/repository/pulls/${i}`;
    },
    url: function (i) {
      return `https://api.github.com/repos/user1/repository/pulls/${i}`;
    },
    comments_url: function (i) {
      return `https://api.github.com/repos/user1/repository/pulls/${i}/comments`;
    },
  },
  default: {
    number: FactoryGuy.generate('number'),
    state: 'open',
    title: FactoryGuy.generate('title'),
    body: FactoryGuy.generate('body'),
    htmlUrl: FactoryGuy.generate('html_url'),
    url: FactoryGuy.generate('url'),
    commentsUrl: FactoryGuy.generate('comments_url'),
    createdAt: sampleDate,
    updatedAt: sampleDate,
    closedAt: sampleDate,
    mergedAt: null,
    userLogin: 'user1',
    traits: {
      merged: {
        state: 'merged',
        mergedAt: sampleDate,
      },
    },
  },
});
