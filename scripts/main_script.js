$(document).ready(function(){
    //Parsing contents onto an Array-by Harsha and Siddarth
    fetch('games.json')
        .then(response => response.text())
        .then(data => {
            // Parsing the JSON data
            const myGames = JSON.parse(data);
            var i = 0;            
            //Setting up the Slider Navigation Menu on the right hand side by Siddarth
            for (let i = 0; i < $(".slider_btn").length; i++) {
                $(".slider_btn img:eq(" + i + ")").attr("src", myGames.games[i].image);
                $(".slider_btn h5:eq(" + i + ")").text(myGames.games[i].name);
            }
            //Setting up other games at the bottom of the page by Harsha
            for (let j = $(".slider_btn").length; j < myGames.games.length; j++) {
                var newDiv = $("<div>").addClass("other_game_container");
                var newImage = $("<img>").addClass("other_game_home_img").attr("src", myGames.games[j].image);
                var newName = $("<h6>").addClass("other_game_home_name").text(myGames.games[j].name);
                newDiv.append(newImage, newName);

                $("#other_games_home").append(newDiv);
                newDiv.css({
                    "width": "300px",
                    "border-radius":"10px",
                    "padding":"10px"
                });
                newImage.css({
                    "width": "100%",
                    "border-radius": "10px"
                });
            }

            //Setting up the main view on the slide
            slideSwitch();

            //Manual Slide Switch Function- Harsha
            $(".slider_btn").click(function(){ 
                $(".slide").animate({
                    opacity: '0'
                }, 200);
                
                //Stop any animation already running
                $(".slider_btn_bg").stop();
                $(".slider_btn").stop();
                $("slider_btn_bg").css("width","0px");

                //Here, we are using the value of variable i(serving as an index) to retrieve
                //pieces of information from JSON and display in appropriate places
                setTimeout(() => {
                    i = $(this).index();
                    $("#slider_name").text(myGames.games[i].name);
                    $(".img_wrapper img:eq(0)").attr("src", myGames.games[i].image);
                    $("#cat").text(myGames.games[i].genre);
                    $("#price").text("€" + myGames.games[i].price);
                    $("#ign_rating").text(myGames.games[i].rating.IGN);
                    $("#gamespot_rating").text(myGames.games[i].rating.gamespot);
                    if(!(myGames.games[i].rating.metacritic.playstation==null)){ 
                        $("#metacritic_rating").text(myGames.games[i].rating.metacritic.playstation);
                    }
                    else if(!(myGames.games[i].rating.metacritic.xbox==null)){
                        $("#metacritic_rating").text(myGames.games[i].rating.metacritic.xbox);
                    }
                    else if(!(myGames.games[i].rating.metacritic.switch==null)){
                        $("#metacritic_rating").text(myGames.games[i].rating.metacritic.switch);
                    }
                    $(".slide").animate({
                        opacity: '1'
                    });
                }, 200); 
                $(".slide").click(function() {
                    window.location.href = "game.html?index="+i;
                });
            });
            
            //Automatic slide switch function- Siddarth
            function slideSwitch(){
                //a small fade-like animation when the page starts to display the below information
                $(".slide").animate({
                    opacity: '0'
                }, 200);

                //Here, we are looping through the parsed JSON array every 5 seconds and displaying new
                //information about a new game. This operates independently from the manual navigation
                //Easily scalable
                setTimeout(() => {
                    $("#slider_name").text(myGames.games[i].name);
                    $(".img_wrapper img:eq(0)").attr("src", myGames.games[i].image);
                    $("#cat").text(myGames.games[i].genre);
                    $("#price").text("€" + myGames.games[i].price);
                    $("#ign_rating").text(myGames.games[i].rating.IGN);
                    $("#gamespot_rating").text(myGames.games[i].rating.gamespot);
                    if(!(myGames.games[i].rating.metacritic.playstation==null)){ 
                        $("#metacritic_rating").text(myGames.games[i].rating.metacritic.playstation);
                    }
                    else if(!(myGames.games[i].rating.metacritic.xbox==null)){
                        $("#metacritic_rating").text(myGames.games[i].rating.metacritic.xbox);
                    }
                    else if(!(myGames.games[i].rating.metacritic.switch==null)){
                        $("#metacritic_rating").text(myGames.games[i].rating.metacritic.switch);
                    }
                    $(".slide").animate({
                        opacity: '1'
                    });
                    $(".slide").click(function() {
                        window.location.href = "game.html?index="+(i-1);
                    });
                    if (i < ($(".slider_btn").length-1) ) {
                        i++;                                
                    }
                    else{
                        console.log(i);
                        i = 0;
                    }
                }, 200);

                //loading-like animation for the slider navigation buttons- by Harsha
                $(".slider_btn_bg:eq("+(i)+")").animate({
                    width:"300px"
                },5000);
                $(".slider_btn_bg:eq("+(i)+")").animate({
                    width:"0px"
                },0)
                x=5000;
                setTimeout(slideSwitch, 5000);
                //Redirecting to the appropriate webpage when a button is clicked-by Siddarth
                //URL Parameters used, more information on game_script.js file
                $(".other_game_container").click(function() {
                    window.location.href = "game.html?index="+($(this).index()+$(".slider_btn").length-1);
                });
                //hover animation in the other games section- by Harsha
                $(".other_game_container").on({
                    mouseenter:function(){
                        $(this).css("background-color", "#88AB8E");
                    },
                    mouseleave:function(){
                        $(this).css("background-color", "#88AB8E00");
                    }
                });
            }
        })
    .catch(error => console.error('Error fetching JSON:', error));

    //Website's reaction to user actions
    //Harsha
    $(".slider_btn").on({
        mouseenter:function(){
            $(this).css("background-color", "#88AB8E90");
        },
        mouseleave:function(){
            $(this).css("background-color", "#88AB8E");
        }
    });
    //Harsha
    $(".slide").on({
        mouseenter:function(){
            $(this).css("transform", "scale(1.05)");
        },
        mouseleave:function(){
            $(this).css("transform", "scale(1.0)");
        } 
    });
    
});