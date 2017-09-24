import Service from '@ember/service';
import config from 'whats-new-in-emberland/config/environment';

export default Service.extend({
  githubAccessToken: config.githubApiKey,
});
