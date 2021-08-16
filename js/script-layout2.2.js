let levelControler = 0;
let index = 0;

const measureResults = () => {
    let result = document.querySelector(".result");
    result.style.display = "flex"
    levelControler = 0;
    let percentage = Math.round((correctAnswer/thisQuizz.data.questions.length)*100);
    let userLevel = "";
    thisQuizz.data.levels.forEach((element, i) => {
        if(Number(element.minValue) <= percentage && Number(element.minValue) >= levelControler){
            userLevel = element.title;
            levelControler = Number(element.minValue);
            index = i;
        }
    });
    let message = `${percentage}% de acerto: ${userLevel}`
    showResults(message);
}

const showResults = message => {
    document.querySelector(".top-result").innerHTML = message;
    document.querySelector(".description img").src = thisQuizz.data.levels[index].image;
    document.querySelector(".description div").innerHTML = thisQuizz.data.levels[index].text;
}

const goHome = () => {
    const alterTo = document.querySelector(".page2")
    const from = document.querySelector(".page1")
    alterTo.classList.add("layout2")
    from.classList.remove("layout1")
}