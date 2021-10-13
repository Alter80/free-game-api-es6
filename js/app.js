// calling api
const initiate = () => {
    const url = "https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc";

    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
            "x-rapidapi-key": "163c78130bmshaedca7f5cd4b380p1269d1jsn0994892547a0"
        }
    })
    .then(res => res.json())
    .then(data => showCards(data))
    .catch(err => {
        console.error(err);
    });
}

initiate();

// showing every games as listed to the page
const showCards = (games) => {
    //console.log(games);
    // for(const game of games){
    //     console.log(game);
    // }
    const cards = document.getElementById('cards')

    games.forEach(game => {
        const card = document.createElement('div');
        card.classList.add('col');

        // console.log(game);
        const thumbImg = game.thumbnail;

        card.innerHTML= `
        <div onclick="selectGame(${game.id})" class="profile-card" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div class="card-body">
                <img src="${thumbImg}" class="img img-fluid" alt="..." >
                <div class="profile-name">${game.title}</div>
                <div class="profile-username">
                    <p>Genre: ${game.genre}</p>
                    <p>Developer: ${game.developer}</p>
                    <p>Platform: ${game.platform}</p>

                </div>
                
            </div>
        </div>

        `;

        cards.appendChild(card);
    });
}

// single game selection
const selectGame = (game) => {
    // console.log('clicked', game);
    const singlegameUrl = "https://free-to-play-games-database.p.rapidapi.com/api/game"

    const selectedGame = singlegameUrl + `?id=${game}`;

    fetch(selectedGame, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
            "x-rapidapi-key": "163c78130bmshaedca7f5cd4b380p1269d1jsn0994892547a0"
        }
    })
        .then(res => res.json())
        .then(data => showOnlyGame(data))
        .catch(err => { //for error handling
            console.error(err);
        });
}

const modalContent = document.createElement('div');
modalContent.classList.add('modal-content');
const showOnlyGame = (singleGame) => {
    console.log(singleGame);

    const thumbImage = singleGame.thumbnail; //thumb
    const gameImages = singleGame.screenshots; //screenshots
    // console.log(typeof(gameImages))
    // console.log(Object.keys(gameImages).length);
    

    const createImgDiv = (gameImgs) => {  
        const numberOfImage = Object.keys(gameImgs).length;
        // console.log(numberOfImage);

        // pushing game screenshots in a modal after modal opening
        setTimeout(() => {
            const imgElement = document.getElementById('gameSlider');
            
            for(let i=0; i<numberOfImage; i++){
                const imageDiv = document.createElement('div');
                imageDiv.classList.add('col-sm-6');
                
                let viewImg = gameImgs[i].image;
                // console.log(viewImg);
                // console.log(typeof(viewImg));

                if(numberOfImage === 0){
                    console.log('no img')
                    imageDiv.innerHTML= `
                        <p>No Images Found</p>
                    `;

                }
                else{
                    imageDiv.innerHTML= `
                        <img id="gameImg" class="img-fluid mx-auto my-2 img-thumbnail bg-dark" src="${viewImg}"></img>                
                `;
                }
                imgElement.appendChild(imageDiv);
            }
        }, 1000);
        
    }
    
    // modal content
    modalContent.innerHTML= `
    <div class="modal-body bg-dark">
        <div class= "container text-center mt-4">
            <img id="gameImg" class="img-fluid" src="${thumbImage}"></img><br>
            
            <button type="button" id="btnClose" class="btn-close btn-close-white float-end" data-bs-dismiss="modal" aria-label="Close"></button>
  
        </div>

      <div class="card-body d-flex flex-column justify-content-center">
        <h3 class="text-center text-bold text-white my-2">${singleGame.title}</h3>
        <h6 class="text-center text-muted text-white">Genere: ${singleGame.genre}</h6>
        <h6 class="text-center text-muted text-white">Platform: ${singleGame.platform}</h6>
        <h6 class="text-center text-muted text-white">Developer: ${singleGame.developer}</h6>
        <p class="text-center text-white">Game URL: <a class="text-muted" href="${singleGame.game_url}" target="_blank">Click here for Download</a> </p> <hr class="text-white">

            <p class="text-center text-white mb-2 fs-5">Images</p> 
        <div onload="${createImgDiv(gameImages)}"  class="container">
            <div id="gameSlider" class="row">

            </div>
        </div>

        <hr class="text-white">
        <p class="text-center text-white mb-2 fs-5">Description</p>
        <p class="text-muted font-weight-light">${singleGame.description}</p>

      </div>

    </div>
    `;

    document.getElementById('modalDialog').appendChild(modalContent);

}