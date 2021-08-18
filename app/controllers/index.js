import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class IndexController extends Controller {
  @service router;

  @action fetchPullRequests({ mergedSince }) {
    this.router.transitionTo('pull-requests', {
      queryParams: {
        mergedSince,
      },
    });
  }
}
