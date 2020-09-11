import { module, test } from 'qunit';
import { buildUrlForSearchingPRs } from 'whats-new-in-emberland/utils/pull-request';

module('Unit | Utility | pull-request', function() {
  test('buildUrlForSearchingPRs works', function(assert) {
    assert.strictEqual(
      buildUrlForSearchingPRs('ember-learn', '2020-08-01'),
      'https://api.github.com/search/issues?q=is:pr+org:ember-learn+created:>=2020-08-01&sort=created&order=desc&per_page=100',
      'We return the correct URL.'
    );
  });
});
