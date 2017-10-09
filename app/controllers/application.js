import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  weekOfYear: computed(function() {
    return moment().isoWeek();
  }),
});
