var require = meteorInstall({"lib":{"routes.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// lib/routes.js                                                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _meteorBlaze = require('meteor/blaze');                                                                           //
                                                                                                                      //
if (Meteor.isClient) {                                                                                                // 4
	Router.route('/', function () {                                                                                      // 5
		this.render('facsynBody');                                                                                          // 6
	});                                                                                                                  //
	Router.route('/home', function () {                                                                                  // 8
		this.render('facsynBody');                                                                                          // 9
	});                                                                                                                  //
	Router.route('/register', function () {                                                                              // 11
		this.render('register');                                                                                            // 12
	});                                                                                                                  //
	Router.route('/supRegister', function () {                                                                           // 14
		this.render('supRegister');                                                                                         // 15
	});                                                                                                                  //
	Router.route('/login', function () {                                                                                 // 17
		this.render('login');                                                                                               // 18
	});                                                                                                                  //
	Router.route('/dashboard', function () {                                                                             // 20
		this.render('dashboard');                                                                                           // 21
	});                                                                                                                  //
	Router.route('/addAuctions', function () {                                                                           // 23
		this.render('addAuctions');                                                                                         // 24
	});                                                                                                                  //
	Router.route('/auctionsSummary', function () {                                                                       // 26
		this.render('auctionsSummary');                                                                                     // 27
	});                                                                                                                  //
	Router.route('/auctionsGrid', function () {                                                                          // 29
		this.render('auctionsGrid');                                                                                        // 30
	});                                                                                                                  //
	Router.route('/viewAuctionDetail', function () {                                                                     // 32
		this.render('viewAuctionDetail');                                                                                   // 33
	});                                                                                                                  //
	Router.route('/completeProfile', function () {                                                                       // 35
		this.render('completeProfile');                                                                                     // 36
	});                                                                                                                  //
	Router.route('/subscriptions', function () {                                                                         // 38
		this.render('subscriptions');                                                                                       // 39
	});                                                                                                                  //
	Router.route('/companytc', function () {                                                                             // 41
		this.render('companytc');                                                                                           // 42
	});                                                                                                                  //
}                                                                                                                     //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"imports":{"startup":{"server":{"auth":{"accounts-config.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/startup/server/auth/accounts-config.js                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _meteorAccountsBase = require('meteor/accounts-base');                                                            //
                                                                                                                      //
_meteorAccountsBase.Accounts.config({                                                                                 // 3
  sendVerificationEmail: false                                                                                        // 4
  //forbidClientAccountCreation : false                                                                               //
});                                                                                                                   //
                                                                                                                      //
Meteor.startup(function () {                                                                                          // 8
  // code to run on server at startup                                                                                 //
  process.env.MAIL_URL = 'smtp://dcdivanshu@gmail.com:v1e2r3m4A5@smtp.gmail.com:587';                                 // 10
  _meteorAccountsBase.Accounts.validateLoginAttempt(function (info) {                                                 // 11
                                                                                                                      //
    if (info.user && info.user.profile && info.user.profile.approved == "N") console.log(">>>>>>>> user is not approved so cannot login" + info.user.userType);else {
      console.log(">>>>>>>> user is approved so can login easily");                                                   // 17
    }                                                                                                                 //
    return true;                                                                                                      // 20
  });                                                                                                                 //
});                                                                                                                   //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"index.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// imports/startup/server/index.js                                                                                    //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
require('./auth/accounts-config');                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},"collections":{"data.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// collections/data.js                                                                                                //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
Auctions = new Mongo.Collection("AUCTIONS");                                                                          // 1
Category = new Mongo.Collection("CATEGORY");                                                                          // 2
Products = new Mongo.Collection("PRODUCTS");                                                                          // 3
Biddings = new Mongo.Collection("BIDDINGS");                                                                          // 4
productsSubscriptions = new Mongo.Collection("PRODUCTS_SUBSCRIPTIONS");                                               // 5
YourFileCollection = new Mongo.Collection("YourFileCollection");                                                      // 6
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"main.js":function(require){

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// server/main.js                                                                                                     //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _meteorMeteor = require('meteor/meteor');                                                                         //
                                                                                                                      //
require('/imports/startup/server/index');                                                                             //
                                                                                                                      //
require('../collections/data');                                                                                       //
                                                                                                                      //
_meteorMeteor.Meteor.methods({                                                                                        // 7
	sendEmail: function sendEmail(userId, email) {                                                                       // 8
		console.log("starting mail");                                                                                       // 9
		Email.send(email);                                                                                                  // 10
	},                                                                                                                   //
	saveAuctions: function saveAuctions(data) {                                                                          // 13
		console.log("Auction Id : " + data._id);                                                                            // 14
		var oldDateFrom = Auctions.find({ "_id": data._id }).fetch()[0].dateFrom;                                           // 15
		var oldDateTo = Auctions.find({ "_id": data._id }).fetch()[0].dateTo;                                               // 16
                                                                                                                      //
		if (data._id == "") {                                                                                               // 19
			Auctions.insert({                                                                                                  // 21
				auctionTitle: data.auctionTitle,                                                                                  // 22
				productName: data.productName,                                                                                    // 23
				quantity: data.quantity,                                                                                          // 24
				dateFrom: data.dateFrom,                                                                                          // 25
				dateTo: data.dateTo,                                                                                              // 26
				category: data.category,                                                                                          // 27
				status: data.status,                                                                                              // 28
				description: data.description,                                                                                    // 29
				condition: data.condition,                                                                                        // 30
				tc: data.termsAndConditions,                                                                                      // 31
				addedBy: _meteorMeteor.Meteor.userId()                                                                            // 32
			});                                                                                                                //
		} else {                                                                                                            //
                                                                                                                      //
			Auctions.update(data._id, {                                                                                        // 37
				$set: {                                                                                                           // 38
					auctionTitle: data.auctionTitle,                                                                                 // 40
					productName: data.productName,                                                                                   // 41
					quantity: data.quantity,                                                                                         // 42
					dateFrom: data.dateFrom,                                                                                         // 43
					dateTo: data.dateTo,                                                                                             // 44
					category: data.category,                                                                                         // 45
					status: data.status,                                                                                             // 46
					description: data.description,                                                                                   // 47
					condition: data.condition,                                                                                       // 48
					tc: data.termsAndConditions                                                                                      // 49
				}                                                                                                                 //
			});                                                                                                                //
                                                                                                                      //
			if (data.dateFrom != oldDateFrom || data.dateTo != oldDateTo) {                                                    // 53
				console.log("starting mail work for date changed");                                                               // 55
				var productId = Auctions.find({ "_id": "6jDxy8J7qgXG2DpKy" }).fetch()[0].productName;                             // 56
				var usersArr = productsSubscriptions.find({ productId: productId }).fetch();                                      // 57
				for (var index in usersArr) {                                                                                     // 58
					var emails = _meteorMeteor.Meteor.users.find({ "_id": usersArr[index]['userNo'] }).fetch()[0].emails[0].address;
					var email = {                                                                                                    // 60
						to: emails,                                                                                                     // 61
						from: 'support@facsyn.com',                                                                                     // 62
						replyTo: 'support@facsyn.com',                                                                                  // 63
						subject: "Auction Time Changed",                                                                                // 64
						text: "Dear User<br> Auction Time has been changed.Please login to facsyn system to check new timings.<br>Regards"
					};                                                                                                               //
					Email.send(email);                                                                                               // 67
					//console.log("Email sent");                                                                                     //
				}                                                                                                                 //
			}                                                                                                                  //
                                                                                                                      //
			console.log("Auction should be updated here" + data.auctionTitle);                                                 // 72
		}                                                                                                                   //
	},                                                                                                                   //
	subscribeProducts: function subscribeProducts(data) {                                                                // 75
                                                                                                                      //
		var added = productsSubscriptions.find({ userNo: _meteorMeteor.Meteor.userId() }).fetch();                          // 77
		if (added == null || added == "") {                                                                                 // 78
			productsSubscriptions.insert({                                                                                     // 80
				productId: data.productIds,                                                                                       // 81
				userNo: data.subscribedBy,                                                                                        // 82
				date: new Date()                                                                                                  // 83
			});                                                                                                                //
			_meteorMeteor.Meteor.users.update({ _id: _meteorMeteor.Meteor.userId() },                                          // 85
			// this row contains fix with $set oper                                                                            //
			{ $set: { "profile.completed": "Y",                                                                                // 88
					"companyName": data.companyName,                                                                                 // 90
					"address": data.address,                                                                                         // 91
					"alternateMobile": data.alternateMobile,                                                                         // 92
					"alternateEmail": data.alternateEmail                                                                            // 93
				}                                                                                                                 //
			});                                                                                                                //
		} else {                                                                                                            //
			productsSubscriptions.update({ userNo: _meteorMeteor.Meteor.userId() },                                            // 99
			// this row contains fix with $set oper                                                                            //
			{ $set: { "productId": data.productIds }                                                                           // 102
			});                                                                                                                //
                                                                                                                      //
			_meteorMeteor.Meteor.users.update({ _id: _meteorMeteor.Meteor.userId() },                                          // 107
			// this row contains fix with $set oper                                                                            //
			{ $set: {                                                                                                          // 110
					"companyName": data.companyName,                                                                                 // 112
					"address": data.address,                                                                                         // 113
					"alternateMobile": data.alternateMobile,                                                                         // 114
					"alternateEmail": data.alternateEmail                                                                            // 115
				}                                                                                                                 //
			});                                                                                                                //
		}                                                                                                                   //
	},                                                                                                                   //
	getAuctionDetails: function getAuctionDetails(data) {                                                                // 124
		var auctionsData = Auctions.find({ '_id': data.auctionId }).fetch();                                                // 126
		return auctionsData;                                                                                                // 127
	},                                                                                                                   //
	removeAuction: function removeAuction(data) {                                                                        // 129
		Auctions.remove(data.auctionId);                                                                                    // 131
	},                                                                                                                   //
	saveBidding: function saveBidding(data) {                                                                            // 134
                                                                                                                      //
		Biddings.insert({                                                                                                   // 137
			auctionId: data.auctionId,                                                                                         // 138
			amount: parseInt(data.amount),                                                                                     // 139
			bidBy: _meteorMeteor.Meteor.userId(),                                                                              // 140
			bidDate: moment(new Date()).format("YYYY-MM-DD"),                                                                  // 141
			accepted: ''                                                                                                       // 142
		});                                                                                                                 //
                                                                                                                      //
		var auctionData = Auctions.findOne({ '_id': data.auctionId });                                                      // 145
		var bidBy = auctionData.addedBy;                                                                                    // 146
		console.log("bidding Data : " + JSON.stringify(auctionData) + bidBy);                                               // 147
		var emails = _meteorMeteor.Meteor.users.findOne({ '_id': bidBy }).emails[0].address;;                               // 148
		console.log("EMail id of manufecturer who posted this bid." + emails);                                              // 149
		var email = {                                                                                                       // 150
			to: emails,                                                                                                        // 151
			from: 'support@facsyn.com',                                                                                        // 152
			replyTo: emails,                                                                                                   // 153
			subject: "Bid Added on Auction",                                                                                   // 154
			text: "Hello User<br> Please login into the system and check bid added on the Auction.<br>Based on the " + "bid amount you can accept or reject that bid.<br><br>Regards"
		};                                                                                                                  //
                                                                                                                      //
		Email.send(email);                                                                                                  // 159
	},                                                                                                                   //
	fixBidding: function fixBidding(data) {                                                                              // 162
                                                                                                                      //
		Biddings.update({ _id: data.bidId },                                                                                // 165
		// this row contains fix with $set oper                                                                             //
		{ $set: { "accepted": data.accepted }                                                                               // 168
		});                                                                                                                 //
                                                                                                                      //
		console.log("update bidding details" + JSON.stringify(data));                                                       // 174
	},                                                                                                                   //
	getCombos: function getCombos() {                                                                                    // 177
		var productsData = Products.find().fetch();                                                                         // 178
		var categoryData = Category.find().fetch();                                                                         // 179
                                                                                                                      //
		var combosData = {};                                                                                                // 181
		combosData["productsCombo"] = productsData;                                                                         // 182
		combosData["categoryCombo"] = categoryData;                                                                         // 183
		return combosData;                                                                                                  // 184
	},                                                                                                                   //
	getCurrentSubscriptions: function getCurrentSubscriptions() {                                                        // 186
		var productsData = Products.find().fetch();                                                                         // 187
		var ps = productsSubscriptions.find().fecth();                                                                      // 188
		Console.log("ProductsData : " + productsData);                                                                      // 189
		Console.log("productsSubscriptions : " + ps);                                                                       // 190
		var combosData = {};                                                                                                // 191
		combosData["productsCombo"] = productsData;                                                                         // 192
		return combosData;                                                                                                  // 193
	},                                                                                                                   //
	getAuctions: function getAuctions(fromWhere) {                                                                       // 195
		console.log("from where is " + fromWhere);                                                                          // 196
                                                                                                                      //
		if (fromWhere == "fromAuctionGrid") {                                                                               // 198
			var subscribedProducts = productsSubscriptions.find({ "userNo": _meteorMeteor.Meteor.userId() }).fetch()[0].productId;
			//var subscribedProductsArr=_.pluck( subscribedProducts,'productId');                                              //
			console.log("sub id is: " + subscribedProducts);                                                                   // 202
			var date = new Date();                                                                                             // 203
			var begun = moment(date).format("YYYY-MM-DD");                                                                     // 204
			var auctionsArray = Auctions.find({ $and: [{ "dateTo": { $gt: begun } }, { "productName": { $in: subscribedProducts } }] }).fetch();
                                                                                                                      //
			//var auctionsArray=Auctions.find({"productName" : {$in:subscribedProducts}}).fetch();                             //
		} else {                                                                                                            //
				var auctionsArray = Auctions.find({ "addedBy": _meteorMeteor.Meteor.userId() }).fetch();                          // 210
			}                                                                                                                  //
                                                                                                                      //
		var catId = _.pluck(auctionsArray, 'category');                                                                     // 213
		var productId = _.pluck(auctionsArray, 'productName');                                                              // 214
                                                                                                                      //
		var categoryName = Category.find({ "id": { $in: catId } }).fetch();                                                 // 216
		var productsName = Products.find({ "_id": { $in: productId } }).fetch();                                            // 217
                                                                                                                      //
		console.log("1======" + productsName);                                                                              // 219
		for (var index in auctionsArray) {                                                                                  // 220
                                                                                                                      //
			var singleCategory = _.findWhere(categoryName, { id: auctionsArray[index]['category'] });                          // 222
			auctionsArray[index]['categoryName'] = singleCategory ? singleCategory['name'] : "-";                              // 223
			var productId1 = _.findWhere(productsName, { id: auctionsArray[index]['productName'] });                           // 224
			console.log(+"2======" + productId1);                                                                              // 225
			auctionsArray[index]['productName'] = productId1 ? productId1['name'] : "-";                                       // 226
			if (auctionsArray[index]['status'] == "1") auctionsArray[index]['status'] = "Active";else if (auctionsArray[index]['status'] == "2") auctionsArray[index]['status'] = "Passive";else if (auctionsArray[index]['status'] == "3") auctionsArray[index]['status'] = "Stopped";
			auctionsArray[index]['startDate'] = String(auctionsArray[index]['dateFrom']).replace("T", " ");                    // 233
			auctionsArray[index]['endDate'] = String(auctionsArray[index]['dateTo']).replace("T", " ");                        // 234
			//auctionsArray[index]['minimumBid']=Biddings.find({"auctionId":auctionsArray[index]['_id']},{limit: 1, sort: {amount: 0}}).fetch()[0].amount;;
			auctionsArray[index]['bidCount'] = Biddings.find({ "auctionId": auctionsArray[index]['_id'] }).count();            // 236
		}                                                                                                                   //
		return auctionsArray;                                                                                               // 238
	}                                                                                                                    //
                                                                                                                      //
});                                                                                                                   //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./lib/routes.js");
require("./collections/data.js");
require("./server/main.js");
//# sourceMappingURL=app.js.map
