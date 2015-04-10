Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading'
});

var mustBeLoggedIn = function() {
  if (!Meteor.userId()) {
  	Router.go('login');
  } else {
    this.next();
  }
};

Router.route('index', {
    path: '/',
    template: 'index',
    onBeforeAction: mustBeLoggedIn
});

Router.route('login', {
    path: '/dang-nhap',
    template: 'login',
    onAfterAction: function () {
    	Session.set('documentTitle', 'Đăng nhập');
  	}
});
