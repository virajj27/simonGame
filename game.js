var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern=[];



  $(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
  });

var level =0;
var started=false;

$(document).keypress(function(){

  if(started===false)
  {
    $("#level-title").text("level "+level);
    nextSequence();
    started=true;
  }

})



function nextSequence() {

  userClickedPattern=[];

level++;
$("#level-title").text("level "+level);
 var randomNumber = Math.floor(Math.random() * 4);
 var randomChosenColour = buttonColours[randomNumber];
 gamePattern.push(randomChosenColour);

 //1. Use jQuery to select the button with the same id as the randomChosenColour
 //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
 $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

 //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
 playSound(randomChosenColour);
}

function playSound(name)
{
  var audio = new Audio("sounds/"+ name +".mp3");
  audio.play();
}

function animatePress(currentColor)
{

  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  },100);
}


function checkAnswer(currentLevel)
{
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
    console.log("success");
    if(gamePattern.length===userClickedPattern.length)
    {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    playSound("wrong");


    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },100);


    $("#level-title").text("Game over! press any key to restart");
    startover();
  }

}

function startover()
{
  level=0;
  gamePattern=[];
  started=false;
}
