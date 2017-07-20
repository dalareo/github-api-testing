const gh = new GitHub({
    username: 'dalareo',
    password: '28Jl2012'
});

const dalareo = gh.getUser('dalareo');
dalareo.listRepos()
    .then(function(response) {
        console.log(response.data[0].owner);
        let starter = response.data[0];
        document.getElementById("demo").innerHTML = '<img src=' + starter.owner.avatar_url + ' style="height: 50px";> username  is ' + starter.owner.login;
    });

const canvas = gh.getRepo('dalareo','creative-canvas');
canvas.getDetails()
    .then(function(response) {
        console.log(response.data);
        let creativeCanvas = response.data;
        document.getElementById("demo1").innerHTML = '<a href=' + creativeCanvas.homepage + '>Creative Canvas</a>';
    }),
canvas.getReadme('selector',true)
    .then(function(response) {
        console.log(response.data);
        var converter = new Showdown.converter();
        document.getElementById("demo2").innerHTML = converter.makeHtml(response.data);
    });
