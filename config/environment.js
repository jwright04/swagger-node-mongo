'use strict';

function environment () {

    return {
        TEST_DB_URL : "mongodb://<db Username>:<db password>@ds115738.mlab.com:15738/<db name>"
    }
}

module.exports = {

    environment : environment
}
