import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { mostRecentSaturday } from 'whats-new-in-emberland/utils/pull-request';

export default class SearchFormComponent extends Component {
  @tracked mergedSince = mostRecentSaturday.format('YYYY-MM-DD');

  @action updateMergedSince(event) {
    this.mergedSince = event.target.value;
  }

  @action submitForm(event) {
    event.preventDefault();

    if (this.args.onSubmit) {
      const { mergedSince } = this;

      this.args.onSubmit({ mergedSince });
    }
  }
}
