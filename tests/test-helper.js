import Application from 'whats-new-in-emberland/app';
import config from 'whats-new-in-emberland/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
