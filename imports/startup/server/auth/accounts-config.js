import { Accounts } from 'meteor/accounts-base';

Accounts.config({
    sendVerificationEmail: false
    //forbidClientAccountCreation : false
});

Meteor.startup(() => {
  // code to run on server at startup
  process.env.MAIL_URL = 'smtp://dcdivanshu@gmail.com:v1e2r3m4A5@smtp.gmail.com:587';
  Accounts.validateLoginAttempt(function(info){
	  
   if( info.user && info.user.profile && info.user.profile.approved=="N")
		console.log(">>>>>>>> user is not approved so cannot login"+info.user.userType);
	else
	{
	  console.log(">>>>>>>> user is approved so can login easily");
		
	}
   return true;
});
  
});