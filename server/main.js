import { Meteor } from 'meteor/meteor';
import '/imports/startup/server/index';
import '../collections/data';
import { Accounts } from 'meteor/accounts-base'


Meteor.methods({
	sendEmail: function (userId, email) {
        console.log("starting mail");
            Email.send(email);
        
    },
    saveAuctions:(data)=>{
	   console.log("Auction Id : "+data._id);
	   
	   
	   if(data._id=="")
	   {
		Auctions.insert({
		  auctionTitle:data.auctionTitle,
		  productName:data.productName,
		  quantity: data.quantity, 
		  dateFrom:data.dateFrom,
		  dateTo:data.dateTo,
		  category:data.category,
		  status:data.status,
		  description:data.description,
		  condition:data.condition,
		  tc:data.termsAndConditions,
		  addedBy:Meteor.userId()
		});  
	   }
	   else{
		var oldDateFrom=Auctions.find({"_id":data._id}).fetch()[0].dateFrom;
	   var oldDateTo=Auctions.find({"_id":data._id}).fetch()[0].dateTo;

			Auctions.update(data._id, {
      			$set: 
				{
					auctionTitle:data.auctionTitle,
					productName:data.productName,
					quantity: data.quantity, 
					dateFrom:data.dateFrom,
					dateTo:data.dateTo,
					category:data.category,
					status:data.status,
					description:data.description,
					condition:data.condition,
					tc:data.termsAndConditions
				}
    		});

			if(data.dateFrom!=oldDateFrom || data.dateTo!=oldDateTo)
	   		{
				console.log("starting mail work for date changed");
				var productId=Auctions.find({"_id":"6jDxy8J7qgXG2DpKy"}).fetch()[0].productName;
				var usersArr=productsSubscriptions.find({productId:productId}).fetch();
				for (var index in usersArr) {
					var emails=Meteor.users.find({"_id":usersArr[index]['userNo']}).fetch()[0].emails[0].address;
					var email = {
						to: emails,
						from: 'support@facsyn.com',
						replyTo:'support@facsyn.com' ,
						subject: "Auction Time Changed",
						html: "Dear User<br> Auction Time has been changed.Please login to facsyn system to check new timings.<br>Regards"
					};
					Email.send(email);
					//console.log("Email sent");
				}
			}

		   console.log("Auction should be updated here"+data.auctionTitle);
	   }
    },
	subscribeProducts:(data)=>{

		var added=productsSubscriptions.find({userNo:Meteor.userId()}).fetch();
		if(added==null || added=="")
		{
			productsSubscriptions.insert({
			productId:data.productIds,
			userNo: data.subscribedBy, 
			date:new Date(),
			});  
			Meteor.users.update(
				{_id:Meteor.userId()},
				// this row contains fix with $set oper
				{ $set : 
					{"profile.completed": "Y",
					"companyName":data.companyName,
					"address":data.address,
					"alternateMobile":data.alternateMobile,
					"alternateEmail":data.alternateEmail
				},
				}
			); 
		}
		else{
			productsSubscriptions.update(
				{userNo:Meteor.userId()},
				// this row contains fix with $set oper
				{ $set : 
					{"productId": data.productIds}
				}
			);

				Meteor.users.update(
				{_id:Meteor.userId()},
				// this row contains fix with $set oper
				{ $set : 
				{
					"companyName":data.companyName,
					"address":data.address,
					"alternateMobile":data.alternateMobile,
					"alternateEmail":data.alternateEmail
				},
				}
			);

		}

		
	},
	getAuctionDetails:(data)=>
	{
		var auctionsData=Auctions.find({'_id':data.auctionId}).fetch();	
		return auctionsData;
	},
	removeAuction:(data)=>
	{
		Auctions.remove(data.auctionId);

	},
	saveBidding:(data)=>
	{

				Biddings.insert({
					auctionId:data.auctionId,
					amount: parseInt(data.amount), 
					bidBy:Meteor.userId(),
					bidDate:moment(new Date()).format("YYYY-MM-DD"),
					accepted:'',
				});

			var auctionData=Auctions.findOne({'_id':data.auctionId});
			var bidBy=auctionData.addedBy;
			console.log("bidding Data : "+JSON.stringify(auctionData)+bidBy);
			var emails=Meteor.users.findOne({'_id':bidBy}).emails[0].address;;
			console.log("EMail id of manufecturer who posted this bid."+emails);
			var email = {
				to: emails,
				from: 'support@facsyn.com',
				replyTo: emails,
				subject: "Bid Added on Auction",
				html: "Hello User<br> Please login into the system and check bid added on the Auction.<br>Based on the "
				+"bid amount you can accept or reject that bid.<br><br>Regards"
        	};

			Email.send(email);

	},
	fixBidding:(data)=>
	{
 
			Biddings.update(
				{_id:data.bidId},
				// this row contains fix with $set oper
				{ $set : 
					{"accepted":data.accepted}
				}
			); 


		console.log("update bidding details"+JSON.stringify(data));

	},
    getCombos:()=>{
		var productsData=Products.find().fetch();
		var categoryData=Category.find().fetch();
		
		var combosData={};
		combosData["productsCombo"]=productsData;
		combosData["categoryCombo"]=categoryData;
		return combosData;
	},
	getCurrentSubscriptions:()=>{
		var productsData=Products.find().fetch();
		var ps=productsSubscriptions.find().fecth();
		
		var combosData={};
		combosData["productsCombo"]=productsData;
		return combosData;
	},
	getProductsCombo:(jsonData)=>
	{
		var categoryId=jsonData['categoryId'];
		var productsArr=Products.find({"categoryId":categoryId}).fetch();
		var productCombo="<option value=-1 >Select</option>";
		for(var i in productsArr)
		{
			productCombo+="<option value='"+productsArr[i]['_id']+"'>"+productsArr[i]['name']+"</option>";
		}
		return productCombo;
	},
	contactUsForm:(jsonData)=>
	{
		var name=jsonData['name'];
		var email=jsonData['email'];
		var phone=jsonData['phone'];
		var message=jsonData['message'];
console.log("Before starting mail");
		var email = {
						to: "facsyn@gmail.com",
						cc:"dcdivanshu@gmail.com",
						bcc:"dcdivanshu@gmail.com",
						from: email,
						replyTo:email ,
						subject: "Contact us Request",
						html: "Dear Admin, There is a request from someone with below detail from contact us form. Please review this and reply accordingly. <br>Name :  "+name+"  --- email :  "+email+"  --- phone : "+phone+"  --- message : "+message
					};
					Email.send(email);
console.log("after  starting mail");

		
	},
	getAuctions: (fromWhere)=>{
		console.log("from where is "+fromWhere);

		if(fromWhere=="fromAuctionGrid")
		{
			var subscribedProducts=productsSubscriptions.find({"userNo":Meteor.userId()}).fetch()[0].productId;
			//var subscribedProductsArr=_.pluck( subscribedProducts,'productId');
			console.log("sub id is: "+subscribedProducts);
			var date = new Date();
			var begun = moment(date).format("YYYY-MM-DD");
			var auctionsArray=Auctions.find({$and : [{"dateTo":{$gt:begun}},{"productName" : {$in:subscribedProducts}} ] } ).fetch();
	
			//var auctionsArray=Auctions.find({"productName" : {$in:subscribedProducts}}).fetch();
		}
		else{
			var auctionsArray=Auctions.find({"addedBy":Meteor.userId()}).fetch();
		}
		console.log("Auctino Array is ::: "+auctionsArray);
		var catId=_.pluck(auctionsArray,'category');
		var productId=_.pluck(auctionsArray,'productName');
		
		var categoryName=Category.find({"_id": {$in:catId}}).fetch();
		var productsName=Products.find({"_id": {$in:productId}}).fetch();
		
		console.log("1======"+categoryName)
		for (var index in auctionsArray) {
			
			let singleCategory = _.findWhere(categoryName, {_id: auctionsArray[index]['category']});
			console.log("a----"+singleCategory);
			auctionsArray[index]['categoryName']=singleCategory? singleCategory['name']:"-";
			console.log("b----"+JSON.stringify(productsName)+"------------"+auctionsArray[index]['productName']);
			let productId1 = _.findWhere(productsName, {_id: auctionsArray[index]['productName']});
			console.log("2======"+productId1);
			auctionsArray[index]['productName']=productId1? productId1['name']:"-";
			if(auctionsArray[index]['status']=="1")
				auctionsArray[index]['status']="Active";
			else if(auctionsArray[index]['status']=="2")
				auctionsArray[index]['status']="Passive";
			else if(auctionsArray[index]['status']=="3")
				auctionsArray[index]['status']="Stopped";
			auctionsArray[index]['startDate']=String(auctionsArray[index]['dateFrom']).replace("T"," ");
			auctionsArray[index]['endDate']=String(auctionsArray[index]['dateTo']).replace("T"," ");
			//auctionsArray[index]['minimumBid']=Biddings.find({"auctionId":auctionsArray[index]['_id']},{limit: 1, sort: {amount: 0}}).fetch()[0].amount;;
			auctionsArray[index]['bidCount']=Biddings.find({"auctionId":auctionsArray[index]['_id']}).count();
		}
		console.log("Last auction data is :: "+JSON.stringify(auctionsArray));
		return  auctionsArray;
    },
	showSupplierDetail:(jsonData)=>{
			var supplierId=jsonData['supplierId'];
			var supplierDetail=Meteor.users.find({"_id":supplierId}).fetch();
			return supplierDetail[0];
	},
	getUsersDetail:(id)=>
	{
		var userDetails=Meteor.users.find({"_id":id}).fetch();
		return userDetails;
	},
	saveUserDetail:(jsonData)=>
	{
		var _id=jsonData._id;
		var name=jsonData.name;
		var phone=jsonData.phone;
		var address=jsonData.address;
		var companyName=jsonData.companyName;
		var alternateEmail=jsonData.alternateEmail;
		var alternateMobile=jsonData.alternateMobile;
		Meteor.users.update({_id:Meteor.userId()}, {
      			$set: 
				{
					"profile.name":name,
					"profile.phone":phone,
					"address":address,
					"companyName":companyName,
					"alternateEmail":alternateEmail,
					"alternateMobile":alternateMobile
				}
    		});
	},

});



