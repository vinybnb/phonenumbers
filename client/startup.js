Meteor.startup(function() {
	Session.set('documentTitle', 'Quản lý số điện thoại khách hàng');
  	Deps.autorun(function() {
    	document.title = Session.get('documentTitle');
  	});
  	Hooks.init();
});
Session.set('documentTitle', 'Quản lý số điện thoại khách hàng');