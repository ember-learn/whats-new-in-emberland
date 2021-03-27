import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import * as QUnit from 'qunit';
import { setup } from 'qunit-dom';
import Application from 'whats-new-in-emberland/app';
import config from 'whats-new-in-emberland/config/environment';

setup(QUnit.assert);

setApplication(Application.create(config.APP));

start();
