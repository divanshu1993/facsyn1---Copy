import { Template } from 'meteor/templating';


YourFileCollection = new FS.Collection("YourFileCollection", {
    stores: [new FS.Store.GridFS("images")]
});
YourFileCollection.allow({
    insert: function (userId, doc) {
        return true;
    },
    update: function (userId, doc) {
        return true;
    },
    remove: function (userId, doc) {
        return true;
    },
    download: function (userId, doc) {
        return true;
    }
});
YourFileCollection.deny({
    insert: function (userId, doc) {
        return false;
    },
    update: function (userId, doc) {
        return false;
    },
    remove: function (userId, doc) {
        return false;
    },
    download: function (userId, doc) {
        return false;
    }
});