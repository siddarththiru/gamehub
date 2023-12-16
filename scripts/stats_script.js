$(document).ready(function(){
    let myChart = null; //bug fix by Harsha (Error: New chart wasn't loading hen rating source was changed)
    var maxRating=10; //optimisation by Siddarth
    fetch('games.json')
        .then(response => response.json())
        .then(myGames => {
            //This function helps to get the exact numberic value of the rating/duration from the String in JSON
            //by Siddarth
            function extractNumericRating(rating) {
                return parseFloat(rating.split('/')[0]);
            }
            function extractNumericDuration(duration) {
                return parseFloat(duration.split(' ')[0]);
            }

            function getPlatformColor(platform) {
                switch (platform) {
                    case 'playstation':
                        return 'rgba(255, 99, 132, 0.2)';
                    case 'xbox':
                        return 'rgba(54, 162, 235, 0.2)';
                    case 'switch':
                        return 'rgba(255, 206, 86, 0.2)';
                    default:
                        // Default color if the platform is not recognized
                        return 'rgba(75, 192, 192, 0.2)';
                }
            }
            
            //By Harsha and Siddarth
            function createRatingsChart(ratingSource) {
                const ctx = document.getElementById('ratingsChart').getContext('2d');
                var existingChart = Chart.getChart(ctx);
            
                // Destroy the existing chart if it exists- bug fix by Harsha
                if (existingChart) {
                    existingChart.destroy();
                }
                //by Siddarth
                const gameNames = myGames.games.map(game => game.name);
                const datasets = [];
                
                // Shows separate bars for PlayStation, Xbox, and Switch- by Harsha
                if (ratingSource === 'metacritic') {
                    const platforms = ['playstation', 'xbox', 'switch'];
                    maxRating=100;
                    platforms.forEach(platform => {
                        const platformData = myGames.games.map(game => {
                            return (game.rating[ratingSource][platform] !== null) ? parseInt(game.rating[ratingSource][platform]) : null;
                        });
                        datasets.push({
                            //Note, its actually meant to be backtick and not single quotes (don't change it)
                            label: `${platform} ${ratingSource} Rating`,
                            data: platformData,
                            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                            borderWidth: 1
                        });
                    });
                }
                //Shows single bar for each value, by Siddarth
                else{
                    const ratingsData = myGames.games.map(game => {
                        return (game.rating[ratingSource] !== null) ? extractNumericRating(game.rating[ratingSource]) : null;
                    });
                    maxRating=10;
                    datasets.push({
                        //Note, its actually meant to be backtick and not single quotes (don't change it)
                        label: `${ratingSource} Rating`,
                        data: ratingsData,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    });
                }
                //Chart is created
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: gameNames,
                        datasets: datasets
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: maxRating
                            }
                        }
                    }
                });
            }
            //By Harsha and Siddarth
            function createDurationsChart(){
                const ctx = document.getElementById('durationsChart').getContext('2d');
                const gameNames = myGames.games.map(game => game.name);

                // Extract numeric durations for each type
                const mainStoryData = myGames.games.map(game => extractNumericDuration(game.duration.mainStory));
                const mainExtraData = myGames.games.map(game => extractNumericDuration(game.duration.mainExtra));
                const completionistData = myGames.games.map(game => extractNumericDuration(game.duration.completionist));

                //Three different bars for each game
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: gameNames,
                        datasets: [{
                            label: 'Main Story Duration (hrs)',
                            data: mainStoryData,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }, {
                            label: 'Main+Extra Duration (hrs)',
                            data: mainExtraData,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }, {
                            label: 'Completionist Duration (hrs)',
                            data: completionistData,
                            backgroundColor: 'rgba(255, 206, 86, 0.2)',
                            borderColor: 'rgba(255, 206, 86, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                                //+10 from the highest value will be the ceiling for the graph
                                max: Math.max(
                                    ...mainStoryData,
                                    ...mainExtraData,
                                    ...completionistData
                                ) + 10
                            }
                        }
                    }
                });
            }
            //DOM to changing the graph when value changes in the select field by Siddarth
            $('#ratingInput').on('change', function() {
                createRatingsChart($(this).val());
            });
            // Initial duration chart creation-Harsha
            createDurationsChart();
            // Initial rating chart creation, IGN is the default-Sid
            createRatingsChart('IGN');
            $(function() {
                $("#tabs").tabs();
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
});
