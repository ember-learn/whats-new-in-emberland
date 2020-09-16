import adopted_ember_addons from './adopted-ember-addons';
import ember_cli from './ember-cli';
import ember_codemods from './ember-codemods';
import ember_fastboot from './ember-fastboot';
import ember_learn from './ember-learn';
import emberjs from './emberjs';
import glimmerjs from './glimmerjs';


const mapOrganizationToPullRequests = new Map([
  ['adopted-ember-addons', adopted_ember_addons],
  ['ember-cli', ember_cli],
  ['ember-codemods', ember_codemods],
  ['ember-fastboot', ember_fastboot],
  ['ember-learn', ember_learn],
  ['emberjs', emberjs],
  ['glimmerjs', glimmerjs],
]);


export default function getPullRequests(organization) {
  return mapOrganizationToPullRequests.get(organization);
}