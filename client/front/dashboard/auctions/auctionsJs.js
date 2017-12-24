import { Template } from 'meteor/templating';


Template.addAuctions.events({
	
  'submit form'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
	//document.auctionForm.serialize();
	var jsonData={};
	jsonData['auctionTitle']=event.target.auctionTitle.value;
	jsonData['description']=event.target.auctionDescription.value;
	jsonData['termsAndConditions']=event.target.termsAndConditions.value;
	jsonData['productName']=event.target.productName.value;
	jsonData['quantity']=event.target.quantity.value;
	jsonData['dateFrom']=event.target.dateFrom.value;
	jsonData['dateTo']=event.target.dateTo.value;
	jsonData['category']=event.target.category.value;
	jsonData['status']=event.target.status.value;
	jsonData['createdBy']=Meteor.userId();
	jsonData['condition']=event.target.condition.value;
	jsonData['_id']=event.target._id.value;
	
	jsonData['createdAt']=new Date();

	Meteor.call('saveAuctions',jsonData);//Calling on server to insert Auctions Details
	location.href='auctionsSummary';
  },

	'change .your-upload-class': function (event, template) {
    console.log("uploading...")

		
    FS.Utility.eachFile(event, function (file) {
      console.log("each file...");
     // var yourFile = new FS.File(file);
      //yourFile.creatorId = 123; // todo
			console.log("File Name:: "+JSON.stringify(file));



      YourFileCollection.insert(file, function (err, fileObj) {
        console.log("callback for the insert, err: "+fileObj, err);
        if (!err) {
          console.log("inserted without error");
        }
        else {
          console.log("there was an error", err);
        }
      });
    });
  }

  
});
Template.auctionsSummary.events({

   'click .deleteAuction': function(){

		var data={};
		data.auctionId=event.target.id;
		if(confirm("Are you sure that you want to remove this auction?"))
		{
			Meteor.call("removeAuction",data);
			Router.go('auctionsSummary');
			location.href="auctionsSummary";
		}
	}


});


Template.viewAuctionDetail.events({
	
  'submit form'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
	//document.auctionForm.serialize();
	var jsonData={};
	jsonData['amount']=event.target.bidAmount.value;
	jsonData['auctionId']=event.target.auctionId.value;
	jsonData['biddingBy']=Meteor.userId();
	jsonData['biddingdate']=new Date();

	Meteor.call('saveBidding',jsonData);//Calling on server to insert Auctions Details
	location.href='viewAuctionDetail?id='+event.target.auctionId.value;
  },
	'click .approve'(event){
		
		var jsonData={};
		jsonData['bidId']=event.target.id;
		jsonData['userBy']=Meteor.userId();
		jsonData['accepted']="Y";
		Meteor.call("fixBidding",jsonData);
 		
	},
	'click .reject'(event){
		
		var jsonData={};
		jsonData['bidId']=event.target.id;
		jsonData['accepted']="N";

		Meteor.call("fixBidding",jsonData);
 		
	}
	

});


Template.addAuctions.helpers({
  auctionDetail: function (name) {
			var id= Router.current().params.query.id;
			return Auctions.find({"_id":id}).fetch()[0];
  }
});