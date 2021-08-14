let myQuizz = {};
let acumulator = 0;

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
    });
}

let verifyBasicInfo = () => {
    // refatorar para switch
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
            <img src = "./assets/Vector.svg" onclick = "openQuestionForms(this)"/>
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
    let parent = button.parentNode;
    parent.classList.remove("form2-empty");
    parent.classList.add("form2");
    parent.innerHTML = div;
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
    };
}

let questionInputsValidation = (i) => {
    let counter = 0;
    let inputs = document.querySelectorAll(`.q${i+1} input`);        
    inputs.forEach((element, f) => {
        switch (f){
            case 0: if(element.value.length >= 20){
                    counter++;
                } else {
                    element.innerHTML += `O título de sua pergunta deve ter no mínimo 20 caracteres`;
                    element.style.background = "#FFE9E9";
                    element.style.color = "#EC362D";
                }
                break;

            case 1: if(element.value[0] === "#" && element.value.length === 7){      
                    counter++;
                } else {
                    element.innerHTML += `A cor de sua pergunta deve estar no padrão hexadecimal`;
                    element.style.background = "#FFE9E9";
                    element.style.color = "#EC362D";
                } 
                break;

            case 2: if(element.value != ""){
                    counter++;
                } else {
                    element.innerHTML += `O texto de sua resposta correta não pode estar vazio`;
                    element.style.background = "#FFE9E9";
                    element.style.color = "#EC362D";
                } 
                break;

            case 3: if(element.value.substring(0,7) === "http://" || element.value.substring(0,8) === "https://"){
                    counter++;
                } else {
                    element.innerHTML += `Você deve inserir uma URL válida`;
                    element.style.background = "#FFE9E9";
                    element.style.color = "#EC362D";
                } 
                break;

            case 4: if(element.value !== ""){
                    counter++;
                } else {
                    element.innerHTML += `O texto de sua resposta correta não pode estar vazio`;
                    element.style.background = "#FFE9E9";
                    element.style.color = "#EC362D";
                }
                break;

            case 5: if((element.value.substring(0,7) === "http://" || element.value.substring(0,8) === "https://")){
                    counter++;
                } else {
                    element.innerHTML += `Você deve inserir uma URL válida`;
                    element.style.background = "#FFE9E9";
                    element.style.color = "#EC362D";
                }
                break;
         }
    })
    acumulator += counter;
}

let verifyQuestionsInfo = () => {
    for(let i = 0; i < myQuizz.numberOfQuestions; i++){
      questionInputsValidation(i);
    }
    if(acumulator === 6*myQuizz.numberOfQuestions){
        acumulator = 0;
        return true
    } else{
        acumulator = 0;
        return false
    }
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
    <input type="text" placeholder="Descrição do nível"></input>`; 
    button.parentNode.classList.remove("form3-empty");
    button.parentNode.classList.add("form3");
    button.parentNode.innerHTML = div;
}

let levelAttributesOrganizer = (level, i) => {
    let inputs = document.querySelectorAll(`.l${i+1} input`);        
    inputs.forEach((element, f) => {
        switch (f){
            case 0: level.title = element.value; break
            case 1: level.minValue = element.value; break
            case 2: level.image = element.value; break
            case 3: level.text = element.value; break
        }
    })
    return level
}

let addLevelsInfo = () => {
    myQuizz.levels = [];
    for(let i = 0; i < myQuizz.numberOfLevels; i++){
        let level = {};
        myQuizz.levels.push(levelAttributesOrganizer(level, i));
    };
}

let levelInputsValidation = (i) => {
    let counter = 0;
    let inputs = document.querySelectorAll(`.l${i+1} input`);        
    inputs.forEach((element, f) => {
        switch (f){
            case 0: if(element.value.length >= 10){
                    counter++;
                } else {
                    element.innerHTML += `O título de seu nível deve ter no mínimo 10 caracteres`;
                    element.style.background = "#FFE9E9";
                    element.style.color = "#EC362D";
                };
                break;

            case 1: if(element.value >= 0 && element.value <= 100){      
                    counter++;
                } else {
                    element.innerHTML += `A porcentagem miníma de acertos de seu nível deve ser um número entre 0 e 100`;
                    element.style.background = "#FFE9E9";
                    element.style.color = "#EC362D";
                };
                if(element.value == 0) {counter++};
                break;

            case 2: if(element.value.substring(0,7) === "http://" || element.value.substring(0,8) === "https://"){
                    counter++;
                } else {
                    element.innerHTML += `Você deve inserir uma url válida`;
                    element.style.background = "#FFE9E9";
                    element.style.color = "#EC362D";
                }; 
                break;

            case 3: if(element.value.length >= 30){
                    counter++;
                } else {
                    element.innerHTML += `A descrição do seu nível deve ter no mínimo 30 caracteres`;
                    element.style.background = "#FFE9E9";
                    element.style.color = "#EC362D";
                };
                break;
         }
    })
    acumulator += counter;
}


let verifyLevelsInfo = () => {
    console.log(myQuizz.numberOfLevels);
    for(let i = 0; i < myQuizz.numberOfLevels; i++){
        levelInputsValidation(i);
    };
    if(acumulator > 4*myQuizz.numberOfLevels){
        acumulator = 0;
        return true
    } else{
        acumulator = 0;
        return false
    }
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
    if(verifyLevelsInfo()){
        delete myQuizz.numberOfLevels;
        delete myQuizz.numberOfQuestions;
        createForms(3);
        changeMyQuizz();
        serverWork();
    }
}

let serverWork = () =>{
    let myQuizzJson = JSON.stringify(myQuizz)
    let promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes", myQuizzJson);
    promise.then(console.log(promise));
    promise.catch();
}

let goToLayout = (n) => {
    let hide = document.querySelector(`.containerForm4`);
    hide.style.display = "none";
    let show = document.querySelector(`.layout${n}`);
    show.style.display = "initial";
}