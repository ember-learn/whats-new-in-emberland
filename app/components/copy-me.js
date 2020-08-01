import { action } from '@ember/object';
import Component from '@ember/component';

export default class CopyMe extends Component {
  selectElementContents(el) {
      var range = document.createRange();
      range.selectNodeContents(el);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
  }

  @action
  copyText() {
    const field = this.element.querySelector(`.copy-field`);
    this.selectElementContents(field);
    document.execCommand('copy');
  }
}
