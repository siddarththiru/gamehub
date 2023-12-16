$(document).ready(function(){
    fetch('games.json')
        .then(response => response.text())
        .then(data => {
            // Parsing the JSON data
            const myGames = JSON.parse(data);

            //URL parameters were chosen to be used as it allows for a single template webpage to be developed
            //which can then be manipulated on to display required information
            //Parameter is set by the main_script.js file and game_script.js uses it to manipulate the game.html webpage
            
            //By Siddarth
            const urlParams = new URLSearchParams(window.location.search);
            var i = urlParams.get('index');
            $("#info_img").attr("src", myGames.games[i].image);
            $("#info_name").text("" + myGames.games[i].name);
            $("#info_publisher").text("Publisher: " + myGames.games[i].publisher);
            $("#info_genre").text("Genre: "+ myGames.games[i].genre);
            $("#info_price").text("Price: €" + myGames.games[i].price);
            $("#info_date").text("Release Date: " + myGames.games[i].releaseDate);

            //By Harsha
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

            $("#info_main_story").text(myGames.games[i].duration.mainStory);
            $("#info_main_extra").text(myGames.games[i].duration.mainExtra);
            $("#info_completionist").text(myGames.games[i].duration.completionist);
            
            //Game Suggestion identifier
            //This section identifies games from the same cateory and displays underneath the div in the main focus as a suggestion of games for users
            //By Harsha
            let firstMatchIndex = -1;
            let secondMatchIndex = -1;
            for (let j = 0; j < myGames.games.length; j++) {
                if(j!=i){
                    if (myGames.games[j].genre === myGames.games[i].genre) {
                        if (firstMatchIndex === -1){
                            $(".game_suggestion_img:eq(0)").attr("src", myGames.games[j].image);
                            $(".game_suggestion_name:eq(0)").text(myGames.games[j].name);
                            firstMatchIndex = j;
                        }
                        else if (secondMatchIndex === -1){
                            $(".game_suggestion_img:eq(1)").attr("src", myGames.games[j].image);
                            $(".game_suggestion_name:eq(1)").text(myGames.games[j].name);
                            secondMatchIndex = j;
                            break;
                        }
                        //Bug fix- Siddarth
                        else{
                            $("#second_suggestion").hide();
                        }
                    }
                }
            }
            //If there is no second game in the same category the whole div is hidden to avoid glitches when hovering over
            //By Harsha
            if(secondMatchIndex===-1)(
                $("#second_suggestion").hide()
            )
            //if there is no game with the same category, the suggestion row is hidden
            //By Siddarth
            if(firstMatchIndex===-1){
                $(".suggestion_row").hide()
            }
            //Parameter refresh when similar game is click- By Harsha
            $(".game_suggestion").click(function(){
                if(($(this).index()+$(".slider_btn").length)===1){
                    window.location.href = "game.html?index="+firstMatchIndex;
                }else{
                    window.location.href = "game.html?index="+secondMatchIndex;
                }
            });
            //Hover Styling by Harsha
            $(".game_suggestion").on({
                mouseenter:function(){
                    $(this).css("background-color", "#88AB8E");
                },
                mouseleave:function(){
                    $(this).css("background-color", "#88AB8E00");
                }
            });
        })
    .catch(error => console.error('Error fetching JSON:', error));
});