import DS from 'ember-data';

export default DS.Model.extend({
  number: DS.attr('number'),
  title: DS.attr('string'),
  body: DS.attr('string'),
  user: DS.belongsTo('githubUser', {
    async: true,
    inverse: null
  })
});
