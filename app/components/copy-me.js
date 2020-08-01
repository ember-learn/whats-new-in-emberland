import Component from '@ember/component';

export default Component.extend({
  selectElementContents(el) {
      var range = document.createRange();
      range.selectNodeContents(el);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
  },
  actions: {
    copyText() {
      const field = this.element.querySelector(`.copy-field`);
      this.selectElementContents(field);
      document.execCommand('copy');
    },
  },
});
