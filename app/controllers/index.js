import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  @action fetchPullRequests({ mergedSince }) {
    this.transitionToRoute('pull-requests', {
      queryParams: {
        mergedSince,
      },
    });
  }
}
