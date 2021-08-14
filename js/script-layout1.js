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

    function showQuizz(quizz){
        console.log(quizz)
        const topQuizz = document.querySelector(".top-quizz")
        let title = quizz.data.title; //titulo geral
        let image = quizz.data.image; //imagem geral
        
        const newTop = `<p style = "background: linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)), url(${image}); background-size: cover; background-repeat: no-repeat;">${title}</p>`;

        topQuizz.innerHTML = newTop;
    
        // let levels = quizz.data.levels.length

        // for (let i = 0; i < levels){
        //     let levelTitle = quizz.data.levels[0].title
        //     let levelImage = quizz.data.levels[0].image
        //     let levelText = quizz.data.levels[0].text
        // }
        
    

    //substituir valores do objeto em um tamplate string com esse forma

    // <div class="top-quizz">           
    //     <p style = "background-image: url(${image}); background-size: cover; background-repeat: no-repeat;">${title}</p>
    // </div>


    //         <div class="question">
    //             <p>Qual cor você mais gosta?</p>   

    //             <div class="top">
    //                 <div>
    //                     <img src="${image}" alt="imagem do quizz">
    //                     <h1>texto</h1>
    //                 </div>
    //                     <div>
    //                         <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURExMYHSggGBolGxMVITEhJSkrLjouFx8zODM4NygtLjcBCgoKDg0OFRAQFS0ZFRktLS0tKysrKy0rKysrKzctNy0tLTctNy03LS03LSsrLSstNysrKysrKy0rKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAHBABAQEBAAIDAAAAAAAAAAAAAAERAhIhMUHR/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECBf/EABcRAQEBAQAAAAAAAAAAAAAAAAARATH/2gAMAwEAAhEDEQA/AOqArTpaYi6gi/SYKBPRagAAKC4gUlAAXUAVAAABdRUBZV1kEirKyoLqaGAI2AzYi2noEBZBagAAABYLQQABUNEUsXUBAUVUQEAIKKgCrjIJFNQFVAEMGoyAAKAvMBBqoFRbEJRNAIKqCiAUAwEAVAUFkQAAAFoVFiANbBkEjUpGVA6MRdBFlQBqsgKAsglReauJgUWsroQRagQWpQUWIohogEBUFFQDWsQQTAAUXEa0TjOAQFkSlAWoLgpFlTUojVTVlSgloAoAAAAAACwEAABQQAAAAAAxZCiVABRfJDAKABqxCUTSwNWQEGrGQxUGrBaypEEABRUAUGQaiAAAALSiVBZEFAWAg1iYJUFtLAqSFNAGmdAatSgIGoCxYtiJAWxFQMABRcRoTU0ECLgIE0atNS0DUwUEUxcCppQAi9MqCYuLjILikpgidI18pguILiCgLgEpUNAAAW1AFkEBIACgsKIgqCtRCFERQwEUQVqUxlRItQ1AixpJE0RemQFAUVAMAAAF1AAjWiVEa0CljKoCoAqggAAFAAABYtZBItqLIYBFqGgiwhYCACgqCCxF0EAFAANVMAFQABYIi+JaaAgsFQWAgBICAWALIiwNXDUtQI1aiLoIaRfEBFQMFSKGnoPQCxEjUBLEW1AWRU1Ai1AFBQECgC6FEQVAI16SUoJRZEFwAgC6WEEEAGsLE0tEQAaFRREBRUAAVAAABUWgmkpgC6gBBYiwTUKUFCChpYi1kTFwxZVoVkAVUAFMNNEEVBcAAFICIC6EEWoKpKi2iFRqGBWQsBQABZElNEWxlvEsCoLCglKNYDIviBUgAYACgALF6ARkoCgACoA1FAZZ6QBrCgAUAGp8HQDKcr+gLq0AQAEf/9k=" alt=" ">
    //                         <h1>texto</h1>
    //                     </div>
    //             </div>                        
    //             <div class="down">
    //                 <div>
    //                     <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURExMYHSggGBolGxMVITEhJSkrLjouFx8zODM4NygtLjcBCgoKDg0OFRAQFS0ZFRktLS0tKysrKy0rKysrKzctNy0tLTctNy03LS03LSsrLSstNysrKysrKy0rKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAHBABAQEBAAIDAAAAAAAAAAAAAAERAhIhMUHR/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECBf/EABcRAQEBAQAAAAAAAAAAAAAAAAARATH/2gAMAwEAAhEDEQA/AOqArTpaYi6gi/SYKBPRagAAKC4gUlAAXUAVAAABdRUBZV1kEirKyoLqaGAI2AzYi2noEBZBagAAABYLQQABUNEUsXUBAUVUQEAIKKgCrjIJFNQFVAEMGoyAAKAvMBBqoFRbEJRNAIKqCiAUAwEAVAUFkQAAAFoVFiANbBkEjUpGVA6MRdBFlQBqsgKAsglReauJgUWsroQRagQWpQUWIohogEBUFFQDWsQQTAAUXEa0TjOAQFkSlAWoLgpFlTUojVTVlSgloAoAAAAAACwEAABQQAAAAAAxZCiVABRfJDAKABqxCUTSwNWQEGrGQxUGrBaypEEABRUAUGQaiAAAALSiVBZEFAWAg1iYJUFtLAqSFNAGmdAatSgIGoCxYtiJAWxFQMABRcRoTU0ECLgIE0atNS0DUwUEUxcCppQAi9MqCYuLjILikpgidI18pguILiCgLgEpUNAAAW1AFkEBIACgsKIgqCtRCFERQwEUQVqUxlRItQ1AixpJE0RemQFAUVAMAAAF1AAjWiVEa0CljKoCoAqggAAFAAABYtZBItqLIYBFqGgiwhYCACgqCCxF0EAFAANVMAFQABYIi+JaaAgsFQWAgBICAWALIiwNXDUtQI1aiLoIaRfEBFQMFSKGnoPQCxEjUBLEW1AWRU1Ai1AFBQECgC6FEQVAI16SUoJRZEFwAgC6WEEEAGsLE0tEQAaFRREBRUAAVAAABUWgmkpgC6gBBYiwTUKUFCChpYi1kTFwxZVoVkAVUAFMNNEEVBcAAFICIC6EEWoKpKi2iFRqGBWQsBQABZElNEWxlvEsCoLCglKNYDIviBUgAYACgALF6ARkoCgACoA1FAZZ6QBrCgAUAGp8HQDKcr+gLq0AQAEf/9k=" alt=" ">
    //                     <h1>texto</h1>
    //                 </div>
    //                 <div>
    //                     <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ8NDQ0NFREWFhURExMYHSggGBolGxMVITEhJSkrLjouFx8zODM4NygtLjcBCgoKDg0OFRAQFS0ZFRktLS0tKysrKy0rKysrKzctNy0tLTctNy03LS03LSsrLSstNysrKysrKy0rKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAHBABAQEBAAIDAAAAAAAAAAAAAAERAhIhMUHR/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECBf/EABcRAQEBAQAAAAAAAAAAAAAAAAARATH/2gAMAwEAAhEDEQA/AOqArTpaYi6gi/SYKBPRagAAKC4gUlAAXUAVAAABdRUBZV1kEirKyoLqaGAI2AzYi2noEBZBagAAABYLQQABUNEUsXUBAUVUQEAIKKgCrjIJFNQFVAEMGoyAAKAvMBBqoFRbEJRNAIKqCiAUAwEAVAUFkQAAAFoVFiANbBkEjUpGVA6MRdBFlQBqsgKAsglReauJgUWsroQRagQWpQUWIohogEBUFFQDWsQQTAAUXEa0TjOAQFkSlAWoLgpFlTUojVTVlSgloAoAAAAAACwEAABQQAAAAAAxZCiVABRfJDAKABqxCUTSwNWQEGrGQxUGrBaypEEABRUAUGQaiAAAALSiVBZEFAWAg1iYJUFtLAqSFNAGmdAatSgIGoCxYtiJAWxFQMABRcRoTU0ECLgIE0atNS0DUwUEUxcCppQAi9MqCYuLjILikpgidI18pguILiCgLgEpUNAAAW1AFkEBIACgsKIgqCtRCFERQwEUQVqUxlRItQ1AixpJE0RemQFAUVAMAAAF1AAjWiVEa0CljKoCoAqggAAFAAABYtZBItqLIYBFqGgiwhYCACgqCCxF0EAFAANVMAFQABYIi+JaaAgsFQWAgBICAWALIiwNXDUtQI1aiLoIaRfEBFQMFSKGnoPQCxEjUBLEW1AWRU1Ai1AFBQECgC6FEQVAI16SUoJRZEFwAgC6WEEEAGsLE0tEQAaFRREBRUAAVAAABUWgmkpgC6gBBYiwTUKUFCChpYi1kTFwxZVoVkAVUAFMNNEEVBcAAFICIC6EEWoKpKi2iFRqGBWQsBQABZElNEWxlvEsCoLCglKNYDIviBUgAYACgALF6ARkoCgACoA1FAZZ6QBrCgAUAGp8HQDKcr+gLq0AQAEf/9k=" alt=" ">
    //                     <h1>texto</h1>
    //                 </div>
    //             </div>
    //         </div>                   

    }


function create(){
    const alterTo = document.querySelector(".page1")
    const from = document.querySelector(".page3") //ainda n tenho esse layout, apenas HTML
    alterTo.classList.add("layout1") //vai dar display:none na tela 1
    from.classList.remove("layout3") //vai retirar display:none da tela 3.1, ajustar essa config no html e css da tela 3
}

