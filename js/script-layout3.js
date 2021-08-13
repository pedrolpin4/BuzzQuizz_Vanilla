
let myQuizz = {};


let addBasicInfo = (title, url, nq, nl) => {
    myQuizz.title = title;
    myQuizz.image = url;
    myQuizz.numberOfQuestions = nq;
    myQuizz.numberOfLevels = nl;
}

let answerValidation = (nq, nl) => {
    if(nq < 3 || !(Number.isInteger(nq))){
        alert("Você deve escolher um número de perguntas inteiro e maior ou igual a 3");
        return false
    } else if (nl < 2 || !(Number.isInteger(nl))){
        alert("Você deve escolher um número de níveis inteiro e maior ou igual a 2");
        return false
    } else if(myQuizz.title == "" || myQuizz.image == ""){
        alert ("Seu quizz deve ter título e imagem de fundo")
        return false
    } else {
        return  true
    }   
}

let createForms = (n) => {
    let hide = document.querySelector(`.containerForm${n}`);
    hide.style.display = "none";
    let show = document.querySelector(`.containerForm${n+1}`);
    show.style.display = "flex";
}

let addOtherQuestions = (nq) => {
    let otherQuestions = "";
    for(i = 0; i < (nq-1); i ++){
        otherQuestions += `
        <div class="form2-empty q${i+2}">
            <p>Pergunta ${i+2}</p>
            <ion-icon name = "paper-plane-outline" onclick = "openForms(this)"></ion-icon>
        </div>`
    }
    document.querySelector(".other-questions").innerHTML += otherQuestions;
}

let goToQuestions = () => {
    let title = document.querySelector(".form1 input:first-child").value
    let urlImage = document.querySelector(".form1 input:nth-child(2)").value
    let numberOfQuestions = Number(document.querySelector(".form1 input:nth-child(3)").value);
    let numberOfLevels = Number(document.querySelector(".form1 input:last-child").value);
    if (answerValidation(numberOfQuestions, numberOfLevels, myQuizz)){
        createForms(1, numberOfQuestions);
        addOtherQuestions(numberOfQuestions);
    }
    addBasicInfo(title, urlImage, numberOfQuestions, numberOfLevels);
}

let openForms = (button) => {
    let div = button.parentNode.innerHTML;
    div += `<input type="text" placeholder="Texto da pergunta"></input>
    <input type="text" placeholder="Cor de fundo da pergunta"></input>
    <p>Resposta correta</p>
    <input type="text" placeholder="Resposta correta"></input>
    <input type="text" placeholder="URL da imagem"></input>
    <p>Respostas incorretas</p>
    <input type="text" placeholder="Resposta incorreta 1"></input>
    <input type="text" placeholder="URL da imagem 1"></input>
    <input type="text" placeholder="Resposta incorreta 2"></input>
    <input type="text" placeholder="URL da imagem 2"></input>
    <input type="text" placeholder="Resposta incorreta 3"></input>
    <input type="text" placeholder="URL da imagem 3"></input>`
    button.parentNode.classList.remove("form2-empty");
    button.parentNode.classList.add("form2");
    button.parentNode.innerHTML = div;
    button.remove();
    // consertar nth:child
}

let attributesOrganizer = (question) =>{
    let inputs = document.querySelectorAll(`.q${i+1} input`);        
    for (let f = 0; f < 10; f++){
        switch (f){
            case 0: question.title = inputs[f].value; break
            case 1: question.color = inputs[f].value; break
            case 2: question.answers = [{text: inputs[f].value, isCorrectAnswer: true}]; break
            case 3: question.answers[0].image = inputs[f].value; break
            case 4: question.answers.push({text: inputs[f].value, isCorrectAnswer: false}); break
            case 5: question.answers[1].image = inputs[f].value; break
            case 6: question.answers.push({text: inputs[f].value, isCorrectAnswer: false}); break
            case 7: question.answers[2].image = inputs[f].value; break
            case 8: question.answers.push({text: inputs[f].value, isCorrectAnswer: false}); break
            case 9: question.answers[3].image = inputs[f].value; break
        }
    }
    return question
}

let addQuestionsInfo = () => {
    myQuizz.questions = [];
    for(let i = 0; i < myQuizz.numberOfQuestions; i++){
        let question = {};
        myQuizz.questions.push(attributesOrganizer(question));
    }
    console.log(myQuizz);
}

let goToLevels = () => {
    addQuestionsInfo();
    createForms(2);    
    let otherLevels = "";
    for(i = 0; i < (myQuizz.nl-1); i ++){
        otherLevels += `
        <div class="form3-empty">
            <p>Nível ${i+2}</p>
            <ion-icon name = "paper-plane-outline"></ion-icon>
        </div>`
    }
    document.querySelector(".other-levels").innerHTML = otherLevels;
}

let goToSuccessPage = () => {
    createForms(3);
}