import Model, { attr } from '@ember-data/model';

export default class GithubComment extends Model {
  @attr('number')
  number;

  @attr('string')
  title;

  @attr('string')
  body;
  //   user: DS.belongsTo('githubUser', {
  //     async: true,
  //     inverse: null
  //   })
}
