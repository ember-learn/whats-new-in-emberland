import Service from '@ember/service';
import config from 'whats-new-in-emberland/config/environment';

export default class GithubSessionService extends Service {
  githubAccessToken = config.githubApiKey;
}
