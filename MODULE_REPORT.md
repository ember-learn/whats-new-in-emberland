## Module Report
### Unknown Global

**Global**: `Ember.Handlebars`

**Location**: `app/controllers/index.js` at line 12

```js
import moment from 'moment';

const { escapeExpression } = Ember.Handlebars.Utils;

const TIMEOUT_INTERVAL = Ember.testing ? 2 : 1000 * 60 * 15;
```

### Unknown Global

**Global**: `Ember.testing`

**Location**: `app/controllers/index.js` at line 14

```js
const { escapeExpression } = Ember.Handlebars.Utils;

const TIMEOUT_INTERVAL = Ember.testing ? 2 : 1000 * 60 * 15;

export default Controller.extend({
```

### Unknown Global

**Global**: `Ember.testing`

**Location**: `app/components/news-item.js` at line 11

```js
import withTestWaiter from 'ember-concurrency-test-waiter/with-test-waiter';

const TIMEOUT_INTERVAL = Ember.testing ? 20 : 1000 * 60 * 5;

export default Component.extend({
```
