
let myQuizz = {};
let URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz";

let createForms = (n) => {
    let hide = document.querySelector(`.containerForm${n}`);
    hide.style.display = "none";
    let show = document.querySelector(`.containerForm${n+1}`);
    show.style.display = "flex";
}

let addBasicInfo = () => {
    let inputs = document.querySelectorAll(".form1 input");
    inputs.forEach((element, i) =>{
        switch(i){
            case 0: myQuizz.title = element.value; break
            case 1: myQuizz.image = element.value; break
            case 2: myQuizz.numberOfQuestions = Number(element.value); break
            case 3: myQuizz.numberOfLevels = Number(element.value); break
        }
    })
    console.log(myQuizz);
}

let verifyBasicInfo = () => {
    if(myQuizz.numberOfQuestions < 3 || !(Number.isInteger(myQuizz.numberOfQuestions))){
        alert("Você deve escolher um número de perguntas inteiro e maior ou igual a 3");
        return false
    } else if (myQuizz.numberOfLevels < 2 || !(Number.isInteger(myQuizz.numberOfLevels))){
        alert("Você deve escolher um número de níveis inteiro e maior ou igual a 2");
        return false
    } else if(myQuizz.title.length < 20 || myQuizz.title.length > 65){
        alert ("Seu quizz deve ter um título com mais de 20 caracteres")
        return false
    } else if (myQuizz.image.substring(0,7) !== "http://" && myQuizz.image.substring(0,8) !== "https://"){
        alert("Escreva uma url de imagem válida")
        return  false
    }  else{
        return true
    }
}

let addOtherQuestions = (nq) => {
    let otherQuestions = "";
    for(i = 0; i < (nq-1); i ++){
        otherQuestions += `
        <div class="form2-empty q${i+2}">
            <p>Pergunta ${i+2}</p>
            <img src = "./assets/Vector.svg" onclick = "openLevelForms(this)"/>
        </div>`
    }
    document.querySelector(".other-questions").innerHTML += otherQuestions;
}

let goToQuestions = () => {
    addBasicInfo();
    if (verifyBasicInfo()){
        createForms(1);
        addOtherQuestions(myQuizz.numberOfQuestions);
    }
}

let openQuestionForms = (button) => {
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
    button.style.display = "none";
    // consertar nth:child
}

let questionAttributesOrganizer = (question, i) => {
    let inputs = document.querySelectorAll(`.q${i+1} input`);        
    inputs.forEach((element, f) => {
        switch (f){
            case 0: question.title = element.value; break
            case 1: question.color = element.value; break
            case 2: question.answers = [{text: element.value, isCorrectAnswer: true}]; break
            case 3: question.answers[0].image = element.value; break
            case 4: question.answers.push({text: element.value, isCorrectAnswer: false}); break
            case 5: question.answers[1].image = element.value; break
            case 6: question.answers.push({text: element.value, isCorrectAnswer: false}); break
            case 7: question.answers[2].image = element.value; break
            case 8: question.answers.push({text: element.value, isCorrectAnswer: false}); break
            case 9: question.answers[3].image = element.value; break
        }
    })
    return question
}

let addQuestionsInfo = () => {
    myQuizz.questions = [];
    for(let i = 0; i < myQuizz.numberOfQuestions; i++){
        let question = {};
        myQuizz.questions.push(questionAttributesOrganizer(question, i));
    }
    console.log(myQuizz);
}

let verifyQuestionsInfo = () => {
    return true
}

let addOtherLevels = () => {
    let otherLevels = "";
    for(i = 0; i < (myQuizz.numberOfLevels-1); i ++){
        otherLevels += `
        <div class="form3-empty l${i+2}">
            <p>Nível ${i+2}</p>
            <img src = "./assets/Vector.svg" onclick = "openLevelForms(this)"/>
        </div>`
    }
    document.querySelector(".other-levels").innerHTML = otherLevels;
}

let goToLevels = () => {
    addQuestionsInfo();
    if(verifyQuestionsInfo()){
        createForms(2);
        addOtherLevels();
    };    
}

let openLevelForms = (button) =>{
    let div = button.parentNode.innerHTML;
    div += `<input type="text" placeholder="Título do nível"></input>
    <input type="text" placeholder="% de acerto mínima"></input>
    <input type="text" placeholder="URL da imagem do nível"></input>
    <input type="text" placeholder="Descrição do nível"></input>`
    button.parentNode.classList.remove("form2-empty");
    button.parentNode.classList.add("form2");
    button.parentNode.innerHTML = div;
    button.style.display = "none";
}

let levelAttributesOrganizer = (level, i) => {
    let inputs = document.querySelectorAll(`.l${i+1} input`);        
    inputs.forEach((element, f) => {
        switch (f){
            case 0: level.title = element.value; break
            case 1: level.image = element.value; break
            case 2: level.text = element.value; break
            case 3: level.minValue = element.value; break
        }
    })
    return level
}

let addLevelsInfo = () => {
    myQuizz.levels = [];
    for(let i = 0; i < myQuizz.numberOfLevels; i++){
        let level = {};
        myQuizz.levels.push(levelAttributesOrganizer(level, i));
    }
    console.log(myQuizz);
}

let verifyLevelsInfo = () => {
    return true
}

let changeMyQuizz = () => {
    let backgroundImage = document.querySelector(".my-quizz");
    let text = myQuizz.title;
    document.querySelector(".my-quizz div").innerHTML = text;
    backgroundImage.style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${myQuizz.image})`
    backgroundImage.style.backgroundSize  = "cover"; 
    backgroundImage.style.backgroundRepeat = "no-repeat";
}

let goToSuccessPage = () => {
    addLevelsInfo();
    delete myQuizz.numberOfLevels;
    delete myQuizz.numberOfQuestions;
    if(verifyLevelsInfo()){
       /* axios.post(`${URL}/quizzes`, myQuizz)
        .then()
        .catch();*/
        createForms(3);
        changeMyQuizz();
    } 
}