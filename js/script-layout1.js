function searchQuizzes() {
    const promisse = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes"
    );
    promisse.then(classifyQuizzes);
  }
searchQuizzes()

function classifyQuizzes(quizzes) {
    console.log(quizzes)  
    if (true){ //mais tarde add verificação se o quizz é meu ou n
        allQuizzes(quizzes)
    }  
    else if (false){
        yourQuizzes(quizzes)
    }
}

function allQuizzes(quizzes){
    let quizzBox = document.querySelector(".quizz-box")
    let quizz = document.querySelector(".quizz")
    let dataLength = quizzes.data.length
    let divAccumulator = " "
    for (let i = 0; i < dataLength; i++){

        let quizzImage = quizzes.data[i].image;
        let quizzName = quizzes.data[i].title;
        console.log(quizzImage)
        console.log(quizzName)

        divAccumulator = divAccumulator +
        `
        <div class="quizz" style = "background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${quizzImage}); background-size: cover; background-repeat: no-repeat;">
            <div> ${quizzName} </div>
        </div>`;

    } 

    quizzBox.innerHTML = divAccumulator;
}

function yourQuizzes(quizzes){
    //template string que cria divs com objetos acoplados
}

