import { Template } from 'meteor/templating';


Template.completeProfile.events({
	
  'submit form'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
	var val= $("input[name='productId']:checked").map( function() { return $(this).val(); } ).get();

	var jsonData={};
	jsonData['productIds']=val;
	jsonData['subscribedBy']=Meteor.userId();
	jsonData['companyName']=event.target.companyName.value;
	jsonData['address']=event.target.address.value;
	jsonData['alternateEmail']=event.target.alternateEmail.value;
	jsonData['alternateMobile']=event.target.alternateMobile.value;
	
	Meteor.call('subscribeProducts',jsonData);//Calling on server to insert Auctions Details
	
	Router.go('auctionsGrid');
  }
  
});