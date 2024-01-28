function makeRequest(contextPath) {
	var gameContainer = document.getElementById('result');
	gameContainer.innerHTML = '';
    var sizeValue = $('#size').val();
    var timeValue = $('#time').val();
    var leniencyValue = $('#leniency').val();
    var ageValue = document.getElementById("gameAge").value;
    
    var selectedGenres = getSelectedOptions('genres');
    var selectedPlatforms = getSelectedOptions('platforms');

    var urlWithParams = contextPath + '/games?result_size=' + sizeValue + '&playtime=' + timeValue;
    
    if (leniencyValue){
    	urlWithParams += '&playtime_leniency=' + leniencyValue;
    }
    
    if (ageValue && ageValue !== ""){
    	urlWithParams += '&age=' + ageValue;
    }
    
    urlWithParams = appendToURLIfNotEmpty(urlWithParams, 'genres', selectedGenres);
    urlWithParams = appendToURLIfNotEmpty(urlWithParams, 'platforms', selectedPlatforms);

    // Make an AJAX GET request
    $.ajax({
        type: 'GET',
        url: urlWithParams, 
        dataType: 'json',
        success: function(response) {
            if (response.data.length > 0) {
				response.data.forEach(function (game) {
		        var gameCard = document.createElement('div');
		        gameCard.className = 'game-card';
		
		        var gameImage = document.createElement('div');
		        gameImage.className = 'game-image';
		        gameImage.style.backgroundImage = 'url(' + game.img + ')';
		        gameCard.appendChild(gameImage);
		
		        var gameDetails = document.createElement('div');
		        gameDetails.className = 'game-details';
		
		        var gameTitle = document.createElement('div');
		        gameTitle.className = 'game-title';
		        gameTitle.textContent = game.name;
		        gameDetails.appendChild(gameTitle);
		
		        var gamePlatforms = document.createElement('div');
		        gamePlatforms.className = 'game-platforms';
		        gamePlatforms.textContent = 'Platforms: ' + capitalizeWordsInList(game.platforms).join(', ');
		        gameDetails.appendChild(gamePlatforms);
		
		        var gamePlaytime = document.createElement('div');
		        gamePlaytime.className = 'game-playtime';
		        gamePlaytime.textContent = 'Playtime: ' + game.playtime + ' hours';
		        gameDetails.appendChild(gamePlaytime);
		        
		        var gameScore = document.createElement('div');
		        gameScore.className = 'game-score';
		        gameScore.textContent = 'Metascore: ' + game.metascore;
		        gameDetails.appendChild(gameScore);
		        
		        var gameReleased = document.createElement('div');
		        gameReleased.className = 'game-released';
		        gameReleased.textContent = 'Released: ' + game.released;
		        gameDetails.appendChild(gameReleased);
		        
		        gameCard.addEventListener('click', function () {
            		displayGameDetails(game);
        		});
		
		        gameCard.appendChild(gameDetails);
		        gameContainer.appendChild(gameCard);
		    });
		    $('html, body').animate({
				scrollTop: $(gameContainer).offset().top
			}, 1000); 
			} else {
				alert('No Results Found.');
			}

        },
        error: function(xhr, status, error) {
                if (xhr.status === 400) {
    				alert('Bad Request');
    				console.error('Error: ' + status + ' - ' + error);
    			} else if(xhr.status === 500) {
    				alert('Internal Server Error');
    				console.error('Error: ' + status + ' - ' + error);
				} else {
    				console.error('Error: ' + status + ' - ' + error);
				}
        }
    });
}
    
function displayGameDetails(game) {
    var modal = document.getElementById('gameModal');
    var gameDetailsContainer = document.getElementById('gameDetailsContainer');

    gameDetailsContainer.innerHTML = '';


    var gameImageModal = document.createElement('img');
    gameImageModal.id = 'gameImageModal';
    gameImageModal.src = game.img;
    gameDetailsContainer.appendChild(gameImageModal);

    gameDetailsContainer.innerHTML += '<h2>' + game.name + '</h2>';
    gameDetailsContainer.innerHTML += '<p>Platforms: ' + capitalizeWordsInList(game.platforms).join(', ') + '</p>';
    gameDetailsContainer.innerHTML += '<p>Playtime: ' + game.playtime + ' hours</p>';
    gameDetailsContainer.innerHTML += '<p>Metascore: ' + game.metascore + '</p>';
    gameDetailsContainer.innerHTML += '<p>Released: ' + game.released + '</p>';

    var gameDescription = document.createElement('div');
    gameDescription.id = 'gameDescription';
    gameDescription.innerHTML = game.description;
    gameDetailsContainer.appendChild(gameDescription);

    modal.style.display = 'block';
}

function closeModal() {
	var modal = document.getElementById('gameModal');
	modal.style.display = 'none';
}

function getSelectedOptions(selectId) {
    var selectedOptions = [];
    var select = document.getElementById(selectId);
    for (var i = 0; i < select.options.length; i++) {
        if (select.options[i].selected) {
            selectedOptions.push(select.options[i].value);
        }
    }
    return selectedOptions;
}
function appendToURLIfNotEmpty(url, paramName, paramValues) {
    if (paramValues.length > 0) {
        url += '&' + paramName + '=' + paramValues.join(',');
    }
    return url;
}

function capitalizeWordsInList(wordList) {
	for (var i = 0; i < wordList.length; i++) {
		var words = wordList[i].split(' ');

		for (var j = 0; j < words.length; j++) {
  		words[j] = words[j].charAt(0).toUpperCase() + words[j].slice(1);
		}

		wordList[i] = words.join(' ');
	}

	return wordList;
}			