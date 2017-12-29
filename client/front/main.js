import { Template } from 'meteor/templating';
import './main.html';
 
 
Template.register.events({

  // handle the form submission
  'submit form': function(event) {

    // stop the form from submitting
    event.preventDefault();


	Accounts.createUser({
	  
	  email: event.target.email.value,
	  password: event.target.password.value,
	  profile:{
		  name: event.target.name.value,		
		  phone: event.target.phone.value,
		  userType: "M",
		  approved: "N",
		  completed:"N",
          packageType:event.target.package.value
	 }
	},function(err){

		alert(err);
	});

  }

});

Template.login.events({

  'submit form': function(event) {

		event.preventDefault();
		let email=event.target.email.value;
		let password=event.target.password.value;
		Meteor.loginWithPassword(email,password,function(err){

			if(err)
				Router.go('home');
			else
			{				
				Router.go('dashboard');	
			}
			
		});
		
  }

});

Template.supRegister.events({
  // handle the form submission
  'submit form': function(event) {
    // stop the form from submitting
      event.preventDefault();
	  Accounts.createUser({
	  
	  email: event.target.email.value,
	  password: event.target.password.value,
	  profile:{
		  name: event.target.name.value,		
		  phone: event.target.phone.value,
		  userType: "S",
		  approved: "N",
		  completed:"N",
          packageType:event.target.package.value

	 }
	});
  }

});



Template.auctionsSummary.rendered = function() {       
    Meteor.call('getAuctions', function(error, list){
        if(error)
            alert(error.reason);
        Session.set('auctions', list);
    });
}

Template.auctionsSummary.helpers({
    auctionsResult: function() {

    // Client: Asynchronously send an email.
         
        return Session.get('auctions')
	},
	auctionsCount:function(){
		 return Auctions.find().count();
	}
});


Template.auctionsGrid.rendered = function() {       
    Meteor.call('getAuctions', "fromAuctionGrid",function(error, list){
        if(error)
            alert(error.reason);
        Session.set('auctions', list);
    });
}

Template.auctionsGrid.helpers({
    auctionsResult: function() {
        return Session.get('auctions')
	},
	auctionsCount: function() {
        return Auctions.find().count();
	}
});



Template.addAuctions.rendered = function() {       
    Meteor.call('getCombos', function(error, list){
        if(error)
            alert(error.reason);
		 Session.set('productsCombo', list['productsCombo']);
        Session.set('categoryCombo', list['categoryCombo']);

    });
}


Template.completeProfile.rendered = function() {       
    Meteor.call('getCombos', function(error, list){
        if(error)
            alert(error.reason);
		
        Session.set('productsCombo', list['productsCombo']);
        Session.set('categoryCombo', list['categoryCombo']);

    });
}

Template.subscriptions.rendered = function() {       
    Meteor.call('getCombos', function(error, list){
        if(error)
            alert(error.reason);
		
		var products=list['productsCombo'];
		var ps=productsSubscriptions.find({"userNo":Meteor.userId()}).fetch()[0].productId.toString();
		console.log("ps : "+ps);
		var psArr=ps.split(",");
		for (var index in products) {
			console.log("2222");
			for(var i=0;i<psArr.length;i++)
			{
				console.log("1 : "+products[index]['id']+"--- "+psArr[i]);
				
				if(products[index]['id']==psArr[i])
				{
					products[index]['checked']="checked";
				}
				
			}
		}
		console.log("products : "+JSON.stringify(products));
        Session.set('productsCombo', products);

    });

}

Template.addAuctions.helpers({
    productsCombo: function() {
		var data=Session.get('productsCombo');
		delete Session.keys['productsCombo']
        return data;
	},
	categoryCombo: function() {
		var data=Session.get('categoryCombo');
		delete Session.keys['categoryCombo']
        return data;
	},
    theFiles: function () {
    return YourFileCollection.find();
  }
});

Template.completeProfile.helpers({
    productsCombo: function() {
		var data=Session.get('productsCombo');
		delete Session.keys['productsCombo'];
        return data;
	}
	
});
Template.subscriptions.helpers({
    productsCombo: function() {
		var data=Session.get('productsCombo');
		delete Session.keys['productsCombo'];
        return data;
	},
	selectedProducts:function()
	{
		var selected=Session.get("selectedProducts");
		return selected;
	}
});


Template.dashboardMenus.helpers({
  supplierType: function (name) {
	var supplierType=Meteor.users.find({ "_id":Meteor.userId() }).fetch()[0].profile.userType;
    return name === supplierType;
  },
  userName: function () {
	var name=Meteor.users.find({ "_id":Meteor.userId() }).fetch()[0].profile.name;
    return name ;
  }
  
});
Template.dashboard.helpers({
  supplierType: function (name) {
	var supplierType=Meteor.users.find({ "_id":Meteor.userId() }).fetch()[0].profile.userType;
    return name === supplierType;
  }
});
Template.viewAuctionDetail.helpers({
  supplierType: function (name) {
	var supplierType=Meteor.users.find({ "_id":Meteor.userId() }).fetch()[0].profile.userType;
    return name === supplierType;
  }
});


Template.navMenu.helpers({
  currentUser: function (name) {
	var userId=Meteor.userId();
	console.log("current user id is :: "+Meteor.userId());
	if(userId==-1 || userId=="" || userId=="-1" || userId==null || userId=="null")
		return true;
	else
		return false;
  },
  
});

Template.navMenu.events({

   'click .logout': function(){
		
		Meteor.logout(function(){ 
			Session.keys = {};
			Router.go('login');

		});
	},
    'click .email':function()
    {
        alert(1);

        var email = {
            to: 'dcdivanshu@gmail.com',
            from: 'abc@failtracker.com',
            replyTo: 'dcdivanshu@gmail.com',
            subject: "test email",
            text: "hello lover boy"
        };
        Meteor.call('sendEmail',null, email);
      
    }


});



Template.viewAuctionDetail.helpers({
  auctionDetail: function (name) {
	  var id= Router.current().params.query.id;
	  return Auctions.find({"_id":id}).fetch()[0];
  },
  minimumBid:function()
  {
      var id= Router.current().params.query.id;
	  return Biddings.find({"auctionId":id},{limit: 1, sort: {amount: 0}}).fetch()[0].amount;

  },
  bidCount:function()
  {
      var id= Router.current().params.query.id;
	  return Biddings.find({"auctionId":id}).count();
  },
  remainingDays:function(){
        var id= Router.current().params.query.id;
        var auctionEndDate=Auctions.find({_id:id}).fetch()[0].dateTo;
        var today = new Date(); var dd = today.getDate(); var mm = today.getMonth()+1; //January is 0! 
        var yyyy = today.getFullYear(); if(dd<10){ dd='0'+dd; } if(mm<10){ mm='0'+mm; } 
        var today = yyyy+"-"+mm+'-'+dd; 
        
        var days=dateDiff2((dd.split(" ")[0]),(auctionEndDate.split(" ")[0]),"days");
        console.log("days are::: "+days);
        return days;
  },
  bidsDetails: function (name) {
	  var auctionId= Router.current().params.query.id;

      var userProfile=Meteor.users.find({ "_id":Meteor.userId() }).fetch()[0].profile;
      var userType=userProfile.userType;
      var biddings;
      if(userType=="M")
         biddings=Biddings.find({ "auctionId":auctionId }).fetch();
      else
         biddings=Biddings.find({$and:[{ "auctionId":auctionId },{"bidBy":Meteor.userId()}]}).fetch();

        
	  var bidBy=_.pluck(biddings,'bidBy');
	  var userprofile=Meteor.users.find({"_id": {$in:bidBy}}).fetch();

	  for (var index in biddings) {
		let user = _.findWhere(userprofile, {_id: biddings[index]['bidBy']});
		biddings[index]['biddingByName']=user.profile.name?user.profile.name:"--";
        if(biddings[index]['accepted']=="Y")
        {
            biddings[index]['status']="Accepted";
        }
        else if(biddings[index]['accepted']=="N")
        {
            biddings[index]['status']="Rejected";
        }
       
	  }

	  return biddings;
  }

});


Template.subscriptions.events({
	
  'submit form'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
	var val= $("input[name='productId']:checked").map( function() { return $(this).val(); } ).get();

	var jsonData={};
	jsonData['productIds']=val;
	jsonData['subscribedBy']=Meteor.userId();
	
	Meteor.call('subscribeProducts',jsonData);//Calling on server to insert Auctions Details
	
	Router.go('auctionsGrid');
  }
  
});

Template.dashboard.helpers({

    supplierBarChart:function(){

        var biddings1=Biddings.find({"bidBy":Meteor.userId()}).fetch();
        var groupedDates=_.groupBy(_.pluck(biddings1,"bidDate"));
        //console.log("new 1:::"+groupedDates);


        var arr=[];
        var auctioninsights="";
        var i=0;

        _.each(_.values(groupedDates), function(dates) {
        console.log({Date: dates[0], Total: dates.length});
        
        var arr2=[];
		arr2[0]=dates[0];
		arr2[1]=parseInt(dates.length);
		arr[i]=arr2;
		i++;

        });

var result="1";

	return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: "Bids By Date"
        },
         xAxis: {
        tickInterval: 1,
        labels: {
            enabled: true,
            formatter: function() { return arr[0][0];}
        }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            type: 'line',
            name: 'No of Bids',
            data: arr
        }]
    };




    },
  lineChart: function (name) {



	var auctions=Auctions.find({"addedBy":Meteor.userId()}).fetch();
    var products=Products.find().fetch();
	var groupedDates = _.groupBy(_.pluck(auctions, 'productName'));




    var arr=[];
	var auctioninsights="";
	var i=0;
  _.each(_.values(groupedDates), function(auctions) {
        let pp= _.findWhere(products, {_id:auctions[0]});
        console.log( pp.name+"products : "+JSON.stringify(pp));
		
        var arr2=[];
		arr2[0]=pp.name;
		arr2[1]=parseInt(auctions.length);
		arr[i]=arr2;
		i++;
        
    });




var result="1";

	return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: "Most Required Product"
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} ',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            type: 'line',
            name: 'No. of Auctions per product',
            data: arr
        }]
    };

  },
  pieChart:function()
  {

	var auctions=Auctions.find({"addedBy":Meteor.userId()}).fetch();
    var products=Products.find().fetch();
	var groupedDates = _.groupBy(_.pluck(auctions, 'productName'));
    
    var arr=[];
	var auctioninsights="";
	var i=0;
  _.each(_.values(groupedDates), function(auctions) {
        let pp= _.findWhere(products, {_id:auctions[0]});
        console.log( pp.name+"products : "+JSON.stringify(pp));
		
        var arr2=[];
		arr2[0]=pp.name;
		arr2[1]=parseInt(auctions.length);
		arr[i]=arr2;
		i++;
        
    });


	return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text:  "Most Required Product"
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} ',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'No. of Auctions Per Product',
            data: arr
        }]
    };


  },
  bidsGraphBySupplier:function()
  {
    
	var auctions=Auctions.find({"addedBy":Meteor.userId()}).fetch();
    var products=Products.find().fetch();
	var groupedDates = _.groupBy(_.pluck(auctions, 'productName'));

    var arr=[];
	var auctioninsights="";
	var i=0;
  _.each(_.values(groupedDates), function(auctions) {
        let pp= _.findWhere(products, {_id:auctions[0]});
        console.log( pp.name+"products : "+JSON.stringify(pp));
		
        var arr2=[];
		arr2[0]=pp.name;
		arr2[1]=parseInt(auctions.length);
		arr[i]=arr2;
		i++;
        
    });



  }


});

function parseDate(date) {
    var result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return result;
}

function daydiff(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return (parseDate(endDate) - parseDate(startDate)) / millisecondsPerDay;
}
function dateDiff2(date1,date2,interval) {
    var second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7;
    date1 = new Date(date1);
    date2 = new Date(date2);
    var timediff = date2 - date1;
    if (isNaN(timediff)) return NaN;
    switch (interval) {
        case "years": return date2.getFullYear() - date1.getFullYear();
        case "months": return (
            ( date2.getFullYear() * 12 + date2.getMonth() )
            -
            ( date1.getFullYear() * 12 + date1.getMonth() )
        );
        case "weeks"  : return Math.floor(timediff / week);
        case "days"   : return Math.floor(timediff / day); 
        case "hours"  : return Math.floor(timediff / hour); 
        case "minutes": return Math.floor(timediff / minute);
        case "seconds": return Math.floor(timediff / second);
        default: return undefined;
    }
}
