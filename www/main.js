var clientID = 'd17dccd820403c76773113e9785dea5a';
var globalPlayer;
SC.initialize({
    client_id: 'd17dccd820403c76773113e9785dea5a'
        //redirect_uri: 'http://example.com/callback' --NOT NEEDED FOR PUBLIC FUNCTIONS
});

// retrieve playlist and create the interactive list
SC.get('playlists/23509158?client_id=' + clientID).then(function(response) {
    console.log(response);
    _(response.tracks).forEach(function(n) {
        //console.log(n.title);
        //note to self: this next line is ugly and would benefit from handlebars or some other template
        $('#tracklist').append("<li class='track' id='" + n.id + "'>" + n.title + "<span class='playcount'>" + n.playback_count + "</span></li>")
    }).value();

    $('.track').on('click', function() {
        console.log("playing " + this.id);
        var that=$(this)

         if (that.attr("class")=="playing"){
            that.addClass("paused");
            globalPlayer.toggle();
         }else if (that.attr("class")=="playing paused"){
         that.removeClass("paused")
         globalPlayer.toggle();
     }else{
        $('#tracklist').children().removeClass("playing")
        that.removeClass("track").addClass("playing");
        startTrack(this.id);
     }

    });

});

//register global event handlers
$(document).ready(function() {

    $('#pause').on('click', function() {
        if (globalPlayer) {
            globalPlayer.toggle();
            $('.playing').toggleClass("paused")
        }
    });

});


function startTrack(id) {
    SC.stream('tracks/' + id).then(function(player) {
        globalPlayer = player;
        globalPlayer.play();

    });
}