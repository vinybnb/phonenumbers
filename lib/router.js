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

Hooks.onLoggedIn = function () {
    // Router.go('index');
}

// Router.map(function() {
//   this.route('index', {path: '/'});
//   this.route('login', {path: 'dang-nhap'});
// });


// Router.onBeforeAction(mustBeLoggedIn, {except: ['login']});