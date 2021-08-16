let correctAnswer = 0;
let thisQuizz = {}

function showQuizz(quizz){
    console.log(quizz)
    thisQuizz = quizz.data;

    //rotina para mudar o topo
    const topQuizz = document.querySelector(".top-quizz")
    let title = quizz.data.title; 
    let image = quizz.data.image;         
    const newTop = `<p style = "background: linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)), url(${image}); background-size: cover; background-repeat: no-repeat;">${title}</p>`;        
    topQuizz.innerHTML = newTop;

    //rotina para criar perguntas
    let questionConteiner = document.querySelector(".question-conteiner")
    let newQuestion = " ";
    let newAnswers = " ";
    let questions = quizz.data.questions.length         
    
    
    //rotina para embaralhar respostas
    let answers = [];
    
    for (let i = 0; i < questions; i++){
        let answer = []; 
        let answersLength = quizz.data.questions[i].answers.length

        for(let j = 0; j < answersLength; j++){ 
            answer.push(quizz.data.questions[i].answers[j]) 
        }

        answer.sort( () => Math.random() - 0.5) //embaralhando subarray
        answers.push(answer)
    }      
    //fim da rotina para embaralhar respostas

    for (let i = 0; i < questions; i++){
        let questionTitle = quizz.data.questions[i].title
        let questionColor = quizz.data.questions[i].color
        let answersLength = quizz.data.questions[i].answers.length

        newQuestion = newQuestion +
        `
        <div class="question">
            <p style = "background: ${questionColor}">${questionTitle}</p>
           `

        for(let j = 0; j < answersLength; j++){            
            
            let answersImage = answers[i][j].image
            let answersText = answers[i][j].text 
            let answersBoolean = answers[i][j].isCorrectAnswer

        if ((j+1)=== answersLength && (answersBoolean === true)) { //na última foto fecha a div question
            newQuestion = newQuestion +
        `       <div class = "options booleanTrue" onclick="processResponse(this)">
                    <img src=" ${answersImage}"  alt="ilustra uma alternativa">
                    <h1 class = "black">${answersText}</h1>
                </div>
            </div>
        `
        } 
        else if ((j+1)=== answersLength && (answersBoolean !== true)) {
            newQuestion = newQuestion +
            `       <div class = "options" onclick="processResponse(this)">
                        <img src=" ${answersImage}"  alt="ilustra uma alternativa">
                        <h1 class = "black">${answersText}</h1>
                    </div>
                </div>
            `

        } 
        else if ( (j+1)!== answersLength && (answersBoolean === true) ){
            newQuestion = newQuestion +
        `   <div class = "options booleanTrue" onclick="processResponse(this)">
                <img src=" ${answersImage}"  alt="ilustra uma alternativa">
                <h1 class = "black">${answersText}</h1>
            </div>
        `
        } 
        else {
            newQuestion = newQuestion +
        `   <div class = "options" onclick="processResponse(this)">
                <img src=" ${answersImage}"  alt="ilustra uma alternativa">
                <h1 class = "black">${answersText}</h1>
            </div>
        `

        }
        }
    }
    questionConteiner.innerHTML = newQuestion; 
    measureResults();
}

function processResponse(element){
    //pegar o elemento pai da opção que foi clicada, que é 
    let parentElement = element.parentNode;
    const classCapture = parentElement.querySelectorAll(".options")

    for (let i = 0; i < classCapture.length; i++){

        let optionText = classCapture[i].querySelector("h1")
        let optionImg = classCapture[i].querySelector("img")
        let optionBoolean = classCapture[i]

        if (optionBoolean.classList.contains("booleanTrue")) {
            optionText.classList.remove("black")
            optionText.classList.add("green")
            if (optionBoolean === element){
                correctAnswer++
            }
        }

        if(optionBoolean !== element){ //percorre todas as respostas, pega todas além da clicada 
            optionImg.classList.add("opacity") //ganha esbranquiçado
        }
    }

    console.log(correctAnswer)
}

    
    
     
//esbranquiçar imagens que não foram clicadas
//deixar legenda verde da resposta correta
//scrollar pra proxima pergunta
//guarda a resposta em algum objeto que mais tarde sera necessario para verificação do resultado


