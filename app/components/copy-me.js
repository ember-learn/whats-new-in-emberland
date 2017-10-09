import Ember from 'ember';

export default Ember.Component.extend({
  selectElementContents(el) {
      var range = document.createRange();
      range.selectNodeContents(el);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
  },
  actions: {
    copyText() {
      console.log(this.get('yield'));
      console.log(this);
      const field = this.get('element').querySelector(`.copy-field`);
      this.selectElementContents(field);
      document.execCommand('copy');
    },
  },
});
