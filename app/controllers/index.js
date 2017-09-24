import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default Controller.extend({
  updatedProjectItems: computed('repos.@each.isLoaded', function() {
    console.log("pre filter");
    const repos = this.get('repos');
    if (isPresent(repos)) {
      console.log("filter");
      const model = this.get('repos').filterBy('isNewThisWeek', true);
      return model;
    }
  }),
});
