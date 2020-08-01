import Model, { attr } from '@ember-data/model';

export default Model.extend({
  number: attr('number'),
  title: attr('string'),
  body: attr('string'),
//   user: DS.belongsTo('githubUser', {
//     async: true,
//     inverse: null
//   })
});
