let myIdsArray;

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
    myIdsArray = JSON.parse(localStorage.getItem("idsList"));
    let myQuizzesLength = myIdsArray.length
    const loadingPage = document.querySelector(".loading-page");
    loadingPage.style.display = "none";
    const layout1 = document.querySelector(".page1");
    layout1.classList.remove("layout1");

    quizzes.data.forEach( element =>{
    let idVerificator = 0;
    if(myQuizzesLength != 0){
            myIdsArray.forEach(myId => {
                if (Number(element.id) === Number(myId)){
                    idVerificator++
                    myQuizzes(element)
                    console.log(element);
                } else {allQuizzes(element)} 
            })
    } else{
        allQuizzes(element);
    }  
    }) 
}

function allQuizzes(quizz){
    let quizzBox = document.querySelector(".quizz-box");        
    quizzBox.innerHTML += `<div id="${quizz.id}" onclick="getQuizz(this)" class="quizz" style = "background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${quizz.image}); background-size: cover; background-repeat: no-repeat;">
                           <div> ${quizz.title} </div>
                           </div>`;
}

function myQuizzes(quizz){
    let creatorBox = document.querySelector(".quizz-creator");
    creatorBox.style.display = "none";
    let myQuizzBox = document.querySelector(".my-quizz-box");
    myQuizzBox.style.display = "flex";
    let myQuizzBoxTitle = document.querySelector(".my-quizz-box-title");
    myQuizzBoxTitle.style.display = "flex";
    myQuizzBox.innerHTML +=`<div id="${quizz.id}" onclick="getQuizz(this)" class="quizz" style = "background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${quizz.image}); background-size: cover; background-repeat: no-repeat;">
                            <div> ${quizz.title} </div>
                            </div>`;
}


function getQuizz(element){

    //ir para pagina 2
    const alterTo = document.querySelector(".page1")
    const from = document.querySelector(".page2")
    const loadingPage = document.querySelector(".loading-page");
    loadingPage.style.display= "none";
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
    let hide = document.querySelector(".page1");
    hide.style.display = "none";
    let show = document.querySelector(".container-form1"); 
    show.style.display = "flex";
}