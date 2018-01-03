import { Blaze } from 'meteor/blaze';

	
if(Meteor.isClient) {
	Router.route('/', function () {
	this.render('facsynBody');
	});
	Router.route('/home', function () {
	this.render('facsynBody');
	});
	Router.route('/register', function () {
	this.render('register');
	});
	Router.route('/supRegister', function () {
	this.render('supRegister');
	});
	Router.route('/login', function () {
	this.render('login');
	});
	Router.route('/dashboard', function () {
	this.render('dashboard');
	});
	Router.route('/addAuctions', function () {
	this.render('addAuctions');
	});
	Router.route('/auctionsSummary', function () {
	this.render('auctionsSummary');
	});
	Router.route('/auctionsGrid', function () {
	this.render('auctionsGrid');
	});
	Router.route('/viewAuctionDetail', function () {
	this.render('viewAuctionDetail');
	});
	Router.route('/completeProfile', function () {
	this.render('completeProfile');
	});
	Router.route('/subscriptions', function () {
	this.render('subscriptions');
	});
	Router.route('/companytc', function () {
	this.render('companytc');
	});
	Router.route('/supplierDetail', function () {
	this.render('supplierDetail');
	});
	
	
	
	
	
}

