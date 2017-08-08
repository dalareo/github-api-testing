import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import { gh } from './github.js';

Template.hello.onCreated(function helloOnCreated() {

});

Template.hello.helpers({

});

Template.selector.events({
    'submit #getRepo': function (event) {
        event.preventDefault()

        const e =event.target;

        const user = gh.getUser(e.user.value);
        user.listRepos()
             .then(function(response) {
                          console.log(response.data[0].owner);
                          let starter = response.data[0];
                          document.getElementById("demo").innerHTML = '<img src=' + starter.owner.avatar_url + ' style="height: 50px";> username  is  ' + starter.owner.login;
                });

        const canvas = gh.getRepo(e.user.value,e.repo.value);
        canvas.getDetails()
            .then(function(response) {
                console.log(response.data);
                let creativeCanvas = response.data;
                document.getElementById("demo1").innerHTML = '<a href=' + creativeCanvas.homepage + '>Creative Canvas</a>';
                });
        canvas.getReadme(e.branch.value,true)
            .then(function(response) {
                console.log(response.data);
                var converter = new Showdown.converter();
                document.getElementById("demo2").innerHTML = converter.makeHtml(response.data);
                });

    },
});

