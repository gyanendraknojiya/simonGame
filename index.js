var colorKeys = ["blue", "green", "red", "yellow"];
var randomColorPattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

reset();

function randomColor() {
    setTimeout(function() {
        level++;
        userClickedPattern = [];
        var i = Math.floor(Math.random() * 4);
        var genKey = colorKeys[i];
        randomColorPattern.push(genKey);
        $("#" + genKey).addClass("pressed");
        setTimeout(function() {
            $(".btn").removeClass("pressed");
        }, 300);
        audioPlay(colorKeys[i]);
        console.log(randomColorPattern);
    }, 2000);

};



$(".btn").click(function() {
    var clickedKey = $(this).attr("id");
    $(this).addClass("pressed");
    setTimeout(function() {
        $(".btn").removeClass("pressed");
    }, 300);
    userClickedPattern.push(clickedKey);
    level = userClickedPattern.length;
    console.log(userClickedPattern);
    audioPlay(clickedKey);
    startGame();
});

function startGame() {
    var i = userClickedPattern.length - 1;
    if (randomColorPattern[i] === userClickedPattern[i]) {
        if (randomColorPattern.length === userClickedPattern.length) {
            $("#level-title").html("Level: " + level);
            setTimeout(randomColor(), 1000);
        }
    } else {
        audioPlay("wrong");
        $("#level-title").html("restart");
        reset();
    }

};

function reset() {
    userClickedPattern = [];
    randomColorPattern = [];
    started = false;
    level = 0;
    $("#level-title").click(function() {
        if (!started) {
            started = true;

            $("#level-title").html("Level: " + level);
            randomColor();
        };
    });
}

function audioPlay(path) {
    var audio = new Audio("./sounds/" + path + ".mp3");
    audio.play();
}