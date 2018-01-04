import { Template } from 'meteor/templating';

Template.supplierDetail.rendered = function() { 
var id= Router.current().params.query.id; 
            var jsonData={};
			jsonData['supplierId']=id;
			Meteor.call("showSupplierDetail",jsonData,function(err,data){
			    Session.set("supplierEmail",data.emails[0].address);
                Session.set("supplierProfile",data.profile);
                
            });  
         
}

Template.supplierDetail.helpers({
  supplierDetails: function (name) {
        var supplierData=Session.get("supplierEmail");
        var supplierProfile=Session.get("supplierProfile");
        var data={};
        data["email"]=supplierData;
        data["name"]=supplierProfile.name;
        data["phone"]=supplierProfile.phone;
        data["fromAuction"]=Router.current().params.query.fromAuction;
        return data; 
  }
});