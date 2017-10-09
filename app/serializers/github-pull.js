import GithubSerializer from 'ember-data-github/serializers/github';

export default GithubSerializer.extend({
  normalize(modelClass, resourceHash, prop) {
    let hash = {
      id: resourceHash.id,
      number: resourceHash.number,
      title: resourceHash.title,
      state: resourceHash.state,
      htmlUrl: resourceHash.html_url,
      body: resourceHash.body,
      createdAt: resourceHash.created_at,
      updatedAt: resourceHash.updated_at,
      closedAt: resourceHash.closed_at,
      mergedAt: resourceHash.merged_at,
      userAvatarUrl: resourceHash.user.avatar_url,
      userLogin: resourceHash.user.login,
      commentsUrl: resourceHash.comments_url,
      links: {
        user: resourceHash.user.url
      }
    };
    return this._super(modelClass, hash, prop);
  }
});
