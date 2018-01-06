import { Template } from 'meteor/templating';


Template.dashboardMenus.events({
'click .editProfile':function()
{
    //alert("Edit profile.");
    //location.href='auctionsGrid';
    
}
});

Template.dashboardMenus.helpers({
  userId: function () {
    return Meteor.userId();
  }
  
});