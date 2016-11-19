'use strict;'
//Include crypto to generate the movie id
let crypto = require('crypto');

module.exports = function(){
    return {
        usersList:[],
        save(user){
            user.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
            this.usersList.push(user);
            return 1;
        },

        find(id){

            if(id){
                return this.usersList.find((user) => {
                    return user.id === id;
                });

            } else {

                return this.usersList;
            }
        },

        remove(id){

            let found = 0;
            this.usersList = this.usersList.filter((user) => {

                if(user.id === id){

                    found = 1;
                } else {

                    return user.id !== id;
                }
            });

            return found;
        },

        update(id, user){

            let userIndex = this.usersList.findIndex((user) => {

                return user.id === id;
            });

            if (userIndex !== -1){

                this.usersList[userIndex].firstName = user.firstName;
                this.usersList[userIndex].lastName = user.lastName;
                this.usersList[userIndex].email = user.email;

                return 1;

            } else {

                return 0;
            }
        }
    }
};