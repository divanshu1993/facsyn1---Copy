Accounts.emailTemplates.siteName = "BOILER PLATE";
Accounts.emailTemplates.from = "BOILER PLATE Admin <no-reply@boiler-plate.com>";
Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return "Welcome to BOILER PLATE, " + user.profile.name;
};
Accounts.emailTemplates.enrollAccount.text = function (user, url) {
    var token = url.split('/').pop();
    var createPasswordUrl = Meteor.absoluteUrl("platform/set-password/" + token);
    return "Welcome to BOILER PLATE platform. Before you can login, you need to setup a password for your new account first."
        + " To proceed, simply click the link below:\n\n"
        + createPasswordUrl;
};

Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "BOILER PLATE - Reset Password  ";
};
Accounts.emailTemplates.resetPassword.text = function (user, url) {
    var token = url.split('/').pop();
    var createPasswordUrl = Meteor.absoluteUrl("set-password/" + token);
    return "To reset your password, please click the link below:\n\n"
        + createPasswordUrl;
};