import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class CopyMeComponent extends Component {
  selectElementContents(element) {
    let range = document.createRange();
    range.selectNodeContents(element);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  @action copyText() {
    const clipboard = document.getElementById('clipboard');
    this.selectElementContents(clipboard);
    document.execCommand('copy');
  }
}
