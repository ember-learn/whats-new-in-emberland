export default function setupPullRequestAssertions(hooks) {
  hooks.beforeEach(setupCustomAssertions);
  hooks.afterEach(cleanupCustomAssertions);
}

function setupCustomAssertions(assert) {
  assert.isPullRequestCorrect = (pullRequest, expectedValues) => {
    const { title, author, repo } = expectedValues;

    assert
      .dom('[data-test-field="Title"]', pullRequest)
      .hasAttribute(
        'href',
        title.href,
        `We see the correct URL for the pull request title.`,
      )
      .hasText(
        title.text,
        `We see the correct text for the pull request title.`,
      );

    assert
      .dom('[data-test-field="Author"]', pullRequest)
      .hasAttribute(
        'href',
        author.href,
        `We see the correct URL for the pull request author.`,
      )
      .hasText(
        author.text,
        `We see the correct text for the pull request author.`,
      );

    assert
      .dom('[data-test-field="Repo"]', pullRequest)
      .hasAttribute(
        'href',
        repo.href,
        `We see the correct URL for the pull request repo.`,
      )
      .hasText(repo.text, `We see the correct text for the pull request repo.`);
  };
}

function cleanupCustomAssertions(assert) {
  delete assert.isPullRequestCorrect;
}
