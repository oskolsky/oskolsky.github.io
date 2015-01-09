//****************************************************************************************************
//
// .. APPLICATION
//
//****************************************************************************************************
window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Router: {}
};



//****************************************************************************************************
//
// .. ROUTER
//
//****************************************************************************************************
App.Router = Backbone.Router.extend({
  
  initialize: function() {
    Backbone.history.start();
  },

  routes: {
    '!signup(/)': 'signup',
    '!signin(/)': 'signin',
    '!update_email(/)': 'update_email',
    '!restore_password(/)': 'restore_password',
    '!cart(/)': 'cart'
  },

  signup: function() {
    this.openDialog('signup');
    return false;
  },

  signin: function() {
    this.openDialog('signin');
    return false;
  },

  update_email: function() {
    this.openDialog('update_email');
    return false;
  },

  restore_password: function() {
    this.openDialog('restore_password');
    return false;
  },  

  cart: function() {
    this.openDialog('cart');
    return false;
  },  

  openDialog: function(dialog) {
    var url = '/data/dialogs/' + dialog + '.html';

    $.arcticmodal('close');

    $.arcticmodal({
      type: 'ajax',
      url: url
    });

    return false;
  },

  closeDialog: function() {
    $.arcticmodal('close');

    return false;
  }

});