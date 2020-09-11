import EmberRouter from '@ember/routing/router';
import config from 'whats-new-in-emberland/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('pull-requests');
});
