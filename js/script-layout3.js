const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz";
let myQuizz = {};


let addBasicInfo = (title, url) => {
    myQuizz.title = title;
    myQuizz.image = url;
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
        otherQuestions += `<div class="form2-empty">
            <p>Pergunta ${i+2}</p>
            <ion-icon name = "paper-plane-outline" onclick = "openForms(this)"></ion-icon>
        </div>`
    }
    document.querySelector(".otherQuestions").innerHTML += otherQuestions;
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
    addBasicInfo(title, urlImage);
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

let addQuestionsInfo = () => {

}

let goToLevels = () => {
    createForms(2);
}

let goToSuccessPage = () => {
    createForms(3);
}