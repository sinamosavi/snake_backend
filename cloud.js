

Parse.Cloud.beforeSave("test", function (request, response) {
    var obj = request.object;

    if(!obj.get('message')) {
        response.error('should have message attr.');
        console.log('FAIL');
    } else {
        response.success();
        console.log('PASS');

    }
});