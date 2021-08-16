let myQuizz = {};
let acumulator = 0;
let ids = [];

const createForms = (n) => {
    let hide = document.querySelector(`.container-form${n}`);
    hide.style.display = "none";
    let show = document.querySelector(`.container-form${n+1}`);
    show.style.display = "flex";
}

const addBasicInfo = () => {
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

const verifyBasicInfo = () => {
    let counter = 0;
    let inputs = document.querySelectorAll(".form1 input");
    inputs.forEach((element, i) => {
        switch(i){
            case 0: if(element.value.length >= 20 && element.value.length <= 65){
                    counter++;   
                }else {
                    element.parentNode.childNodes[3].innerHTML += `O título de seu quizz deve ter no mínimo 20 caracteres`;
                    element.style.background = "#FFE9E9";
                    element.style.marginBottom = "0px"
                } break;
            case 1: if(element.value.substring(0,7) === "http://" || element.value.substring(0,8) === "https://"){
                    counter++;
                    console.log(element.parentNode.childNodes[3]);   
                } else {
                    element.parentNode.childNodes[3].innerHTML += `Você deve inserir uma URL válida`;
                    element.style.background = "#FFE9E9";
                    element.style.marginBottom = "0px"
                } break;
            case 2: if(element.value >= 3 && !!(Number.isInteger(Number(element.value)))) {
                    counter++;   
                } else {
                    element.parentNode.childNodes[3].innerHTML += `O quizz deve ter pelo menos 3 perguntas`;
                    element.style.background = "#FFE9E9";
                    element.style.marginBottom = "0px"
                } break;
            case 3: if(element.value >= 2 && !!(Number.isInteger(Number(element.value)))){
                    counter++;   
                } else {
                    element.parentNode.childNodes[3].innerHTML += `O quizz deve ter pelo menos 2 níveis`;
                    element.style.background = "#FFE9E9";
                    element.style.marginBottom = "0px"
                } break;
        }
    })

    if(counter === 4){
        return true
    } else {
        return false
    }
}

const addOtherQuestions = (nq) => {
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

const goToQuestions = () => {
    addBasicInfo();
    if (verifyBasicInfo()){
        createForms(1);
        addOtherQuestions(myQuizz.numberOfQuestions);
    }
}

const openQuestionForms = (button) => {
    let div = button.parentNode.innerHTML;
    div += `
    <div class = "container-input">
        <input type="text" placeholder="Texto da pergunta">
        <p></p>
    </div>
    <div class = "container-input">
        <input type="text" placeholder="Cor de fundo da pergunta">
        <p></p>
    </div>
    <p>Resposta correta</p>
    <div class = "container-input">
        <input type="text" placeholder="Resposta correta">
        <p></p>
    </div>
    <div class = "container-input">
        <input type="text" placeholder="URL da imagem">
        <p></p>
    </div>
    <p>Respostas incorretas</p>
    <div class = "container-input">
        <input type="text" placeholder="Resposta incorreta 1">
        <p></p>
    </div>
    <div class = "container-input">
        <input type="text" placeholder="URL da imagem 1">
        <p></p>
    </div>
    <div class = "container-input">
        <input type="text" placeholder="Resposta incorreta 2">
        <p></p>
    </div>
    <div class = "container-input">
        <input type="text" placeholder="URL da imagem 2">
        <p></p>
    </div>
    <div class = "container-input">
        <input type="text" placeholder="Resposta incorreta 3">
        <p></p>
    </div>
    <div class = "container-input">
        <input type="text" placeholder="URL da imagem 3">
        <p></p>
    </div> `

    let parent = button.parentNode;
    parent.classList.remove("form2-empty");
    parent.classList.add("form2");
    parent.innerHTML = div;
    // consertar nth:child
}

const questionAttributesOrganizer = (question, i) => {
    let inputs = document.querySelectorAll(`.q${i+1} input`);        
    inputs.forEach((element, f) => {
        switch (f){
            case 0: question.title = element.value; break
            case 1: question.color = element.value; break
            case 2: question.answers = [{text: element.value, isCorrectAnswer: true}]; break
            case 3: question.answers[0].image = element.value; break
            case 4: question.answers.push({text: element.value, isCorrectAnswer: false}); break
            case 5: question.answers[1].image = element.value; break
            case 6: if(element.value != ""){
                        question.answers.push({text: element.value, isCorrectAnswer: false})
                    }; break
            case 7: if(element.value != ""){
                        question.answers[2].image = element.value
                    }; break
            case 8: if(element.value != ""){
                        question.answers.push({text: element.value, isCorrectAnswer: false})
                    }; break
            case 9: if(element.value != ""){
                        question.answers[3].image = element.value
                    }; break
        }
    })
    return question
}

const addQuestionsInfo = () => {
    myQuizz.questions = [];
    for(let i = 0; i < myQuizz.numberOfQuestions; i++){
        let question = {};
        myQuizz.questions.push(questionAttributesOrganizer(question, i));
    };
}

const questionInputsValidation = (i) => {
    let counter = 0;
    let inputs = document.querySelectorAll(`.q${i+1} input`);        
    inputs.forEach((element, f) => {
        switch (f){
            case 0: if(element.value.length >= 20){
                    counter++;
                } else {
                    element.parentNode.childNodes[3].innerHTML += `O título de sua pergunta deve ter no mínimo 20 caracteres`;
                    element.style.background = "#FFE9E9";
                    element.style.marginBottom = "0px";
                }
                break;

            case 1: if(element.value[0] === "#" && element.value.length === 7){      
                    counter++;
                } else {
                    element.parentNode.childNodes[3].innerHTML += `A cor de sua pergunta deve estar no padrão hexadecimal`;
                    element.style.background = "#FFE9E9";
                    element.style.marginBottom = "0px";
                } 
                break;

            case 2: if(element.value != ""){
                    counter++;
                } else {
                    element.parentNode.childNodes[3].innerHTML += `O texto de sua resposta correta não pode estar vazio`;
                    element.style.background = "#FFE9E9";
                    element.style.marginBottom = "0px";
                } 
                break;

            case 3: if(element.value.substring(0,7) === "http://" || element.value.substring(0,8) === "https://"){
                    counter++;
                } else {
                    element.parentNode.childNodes[3].innerHTML += `Você deve inserir uma URL válida`;
                    element.style.background = "#FFE9E9";
                    element.style.marginBottom = "0px";
                } 
                break;

            case 4: if(element.value !== ""){
                    counter++;
                } else {
                    element.parentNode.childNodes[3].innerHTML += `Você deve ter pelo menos uma resposta incorreta`;
                    element.style.background = "#FFE9E9";
                    element.style.marginBottom = "0px";
                }
                break;

            case 5: if((element.value.substring(0,7) === "http://" || element.value.substring(0,8) === "https://")){
                    counter++;
                } else {
                    element.parentNode.childNodes[3].innerHTML += `Você deve inserir uma URL válida`;
                    element.style.background = "#FFE9E9";
                    element.style.marginBottom = "0px";
                }
                break;
         }
         //add case url válida ou vazio
    })
    acumulator += counter;
}

const verifyQuestionsInfo = () => {
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

const addOtherLevels = () => {
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

const goToLevels = () => {
    addQuestionsInfo();
    if(verifyQuestionsInfo()){
        createForms(2);
        addOtherLevels();
    };    
}

const openLevelForms = (button) =>{
    let div = button.parentNode.innerHTML;
    div += `
    <div class = "container-input">
        <input type="text" placeholder="Título do nível">
        <p></p>
    </div>
    <div class = "container-input">
        <input type="text" placeholder="% de acerto mínima">
        <p></p>
    </div>
    <div class = "container-input">
        <input type="text" placeholder="URL da imagem do nível">
        <p></p>
    </div> 
    <div class = "container-input">
        <input type="text" placeholder="Descrição do nível">
        <p></p> 
    </div>`;
    
    button.parentNode.classList.remove("form3-empty");
    button.parentNode.classList.add("form3");
    button.parentNode.innerHTML = div;
}

const levelAttributesOrganizer = (level, i) => {
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

const addLevelsInfo = () => {
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
                    element.parentNode.childNodes[3].innerHTML += `O título de seu nível deve ter no mínimo 10 caracteres`;
                    element.style.background = "#FFE9E9";
                    element.style.marginBottom = "0px";
                };
                break;

            case 1: if(( Number(element.value) > 0 || element.value === "0" )  && ( Number(element.value) < 100 || element.value === "100")) {      
                    counter++;
                } else {
                    element.parentNode.childNodes[3].innerHTML += `A porcentagem miníma de acertos de seu nível deve ser entre 0 e 100`;
                    element.style.background = "#FFE9E9";
                    element.style.marginBottom = "0px";
                };
                if(element.value == 0) {counter++};
                break;

            case 2: if(element.value.substring(0,7) === "http://" || element.value.substring(0,8) === "https://"){
                    counter++;
                } else {
                    element.parentNode.childNodes[3].innerHTML += `Você deve inserir uma url válida`;
                    element.style.background = "#FFE9E9";
                    element.style.marginBottom = "0px";
                }; 
                break;
            case 3: if(element.value.length > 30 || element.value.length == 30 ){
                    counter++;
                } else {
                    element.parentNode.childNodes[3].innerHTML += `A descrição do seu nível deve ter no mínimo 30 caracteres`;
                    element.style.background = "#FFE9E9";
                    element.style.marginBottom = "0px";
                };
                break;
         }
    })
    acumulator += counter;
}


const verifyLevelsInfo = () => {
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

const changeMyQuizz = () => {
    let backgroundImage = document.querySelector(".my-quizz");
    let text = myQuizz.title;
    document.querySelector(".my-quizz div").innerHTML = text;
    backgroundImage.style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${myQuizz.image})`
    backgroundImage.style.backgroundSize  = "cover"; 
    backgroundImage.style.backgroundRepeat = "no-repeat";
}

const goToSuccessPage = () => {
    addLevelsInfo();
    if(verifyLevelsInfo()){
        delete myQuizz.numberOfLevels;
        delete myQuizz.numberOfQuestions;
        createForms(3);
        changeMyQuizz();
    }
}

const serverWork = () =>{
    let hide = document.querySelector(`.container-form4`);
    hide.style.display = "none";
    let show = document.querySelector(`.loading-page`);
    show.style.display = "flex";
    console.log(myQuizz);
    const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v3/buzzquizz/quizzes", myQuizz);
    promise.then(myQuizzOrganizer);
    promise.catch(treatError);
}

const myQuizzOrganizer = quizz => {
    localStorage.removeItem("idsList");
    console.log(quizz.data);
    JSON.parse(ids);
    let myId = quizz.data.id;
    ids.push(myId);
    JSON.stringify(ids);
    localStorage.setItem("idsList", ids);
    getQuizz(quizz.data);
}

const goToLayout1 = () => {
    let hide = document.querySelector(`.loading-page`);
    hide.style.display = "none";
    let show = document.querySelector(`.page1`);
    show.classList.remove(".layout1");
}

const treatError = () => {
    alert("deu xabu!")
    let hide = document.querySelector(`.loading-page`);
    hide.style.display = "none";
    let show = document.querySelector(`.container-form4`);
    show.style.display = "flex";
}