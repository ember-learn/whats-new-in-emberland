import FactoryGuy from 'ember-data-factory-guy';

const commentBodies = [
  'LGTM',
  'theres a minor typo, this needs to be fixed before merge',
  'shouldnt we rather use ember-test-selectors here',
  'havent tested it but looks good +1',
  'have tested it but still looks good +2',
]

FactoryGuy.define('github-comment', {
  sequences: {
    number: function(num) {
      return num;
    },
    body: function (i) {
      return commentBodies[i % commentBodies.length];
    },
  },
  default: {
    user: FactoryGuy.belongsTo('github-user'),
    number: FactoryGuy.generate('number'),
    body: FactoryGuy.generate('body'),
  },
});
