function searchQuizzes() {
    const loadingPage = document.querySelector(".loading-page");
    loadingPage.style.display = "flex";
    const layout1 = document.querySelector(".page1");
    layout1.classList.add("layout1"); 
    const promisse = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes"
    );
    promisse.then(classifyQuizzes);
  }
searchQuizzes()

function classifyQuizzes(quizzes) {
    console.log(quizzes)
    const loadingPage = document.querySelector(".loading-page");
    loadingPage.style.display = "none";
    const layout1 = document.querySelector(".page1");
    layout1.classList.remove("layout1"); 
    if (true){ //mais tarde add verificação se o quizz é meu ou n
        allQuizzes(quizzes)
    }  
    else if (false){
        myQuizzes(quizzes)
    }
}

function allQuizzes(quizzes){
    let quizzBox = document.querySelector(".quizz-box")
    let dataLength = quizzes.data.length
    let divAccumulator = " "

    for (let i = 0; i < dataLength; i++){

        let quizzImage = quizzes.data[i].image;
        let quizzName = quizzes.data[i].title;
        let quizzID = quizzes.data[i].id;
        
        divAccumulator = divAccumulator +
        `
        <div id="${quizzID}" onclick="getQuizz(this)" class="quizz" style = "background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${quizzImage}); background-size: cover; background-repeat: no-repeat;">
            <div> ${quizzName} </div>
        </div>`;
    } 

    quizzBox.innerHTML = divAccumulator;   
}

function myQuizzes(quizzes){
    //template string que cria divs com objetos acoplados
}

function getQuizz(element){

    //ir para pagina 2
    const alterTo = document.querySelector(".page1")
    const from = document.querySelector(".page2")
    alterTo.classList.add("layout1")
    from.classList.remove("layout2")

    //pegar quizz clicado e mostrar na pagina 
    let id = element.id
    const promisse = axios.get(
        `https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes/${id}`
      );
      promisse.then(showQuizz);
    }

function create(){
    let hide = document.querySelector(".layout1");
    hide.style.display = "none";
    let show = document.querySelector(".container-form1"); 
    show.style.display = "flex";
}