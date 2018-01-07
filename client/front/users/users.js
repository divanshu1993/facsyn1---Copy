import { Template } from 'meteor/templating';

Template.editUsers.rendered=function(){
 
    var userId= Router.current().params.query.userId;
        var data1={};
        Meteor.call("getUsersDetail",userId,function(err,data){
            console.log("user Detrail is :::"+JSON.stringify(data[0])) ;
            data1= data[0];
            Session.set("userDetail",data1);
        });
}
Template.editUsers.helpers({

    userDetail: function(event) {
       var userDetail= Session.get("userDetail");
       //delete Session.keys['userDetail'];
       return userDetail;
	}

});


Template.editUsers.events({
    'submit .userDetailForm':function(event){
        var jsonData={};
        jsonData['name']=event.target.name.value;
        jsonData['phone']=event.target.phone.value;
        jsonData['companyName']=event.target.companyName.value;
        jsonData['alternateEmail']=event.target.alternateEmail.value;
        jsonData['alternateMobile']=event.target.alternateMobile.value;
        jsonData['address']=event.target.address.value;
        
       Meteor.call("saveUserDetail",jsonData,function(err,data){
           // Router.go("dashboard");
       });


    },
    'submit .userPasswordForm':function(){
         var jsonData={};
        let oldPassword=event.target.oldpassword.value;
        let newPassword=event.target.password.value;
        Accounts.changePassword(oldPassword,newPassword,function(err){
			console.log("Not table to change user password....."+err);
		});

    }



});
