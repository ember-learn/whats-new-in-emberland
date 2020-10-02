module.exports = function() {
    return {
      clientAllowedKeys: ['GITHUB_API_KEY'],
      // Fail build when there is missing any of clientAllowedKeys environment variables.
      // By default false.
      failOnMissingKey: false
    };
};
