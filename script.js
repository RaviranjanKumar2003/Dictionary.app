const form=document.querySelector("form");
const resultDiv=document.querySelector(".result");

form.addEventListener('submit' ,(e)=>{
    e.preventDefault();
    getWorldInfo(form.elements[0].value);
});

const getWorldInfo= async (word)=>{
    try{
        resultDiv.innerHTML="Fetching Data..." 
    const response= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data= await response.json();
    // let definitions=data[0].meanings[0].definitions[0];
    resultDiv.innerHTML=`
        <h2><strong>Word: </strong>${data[0].word}</2>
        <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
        <p><strong>Meaning: </strong>${data[0].meanings[0].definitions[0].definition===undefined?"Not found" : data[0].meanings[0].definitions[0].definition}</p>
        <p><strong>Example: </strong>${data[0].meanings[0].definitions[0].example===undefined?"Not fount" :data[0].meanings[0].definitions[0].example }</p>
        <p><strong>Antonyms: </strong>
    `;
//     if(data[0].meanings[0].definitions.length==0){
//         resultDiv.innerHTML +=`<span>Not found</span>`
//    }
//    else{
//        for(let i=0;i<data[0].meanings[0].definitions.length;i++){
//            resultDiv.innerHTML += `<li>${data[0].meanings[0].definitions[i].definition}</li>`
//        }
//    }
    if(data[0].meanings[0].antonyms.length===0){
        resultDiv.innerHTML +=`<span>Not found</span>`
    }
    else{
        for(let i=0;i<data[0].meanings[0].antonyms.length;i++){
            resultDiv.innerHTML += `<li>${data[0].meanings[0].antonyms[i]}</li>`
        }
    }
    
    resultDiv.innerHTML +=`<div class="ank"><a href="${data[0].sourceUrls} target="blank">Read More</a></div>`
}
catch{
    resultDiv.innerHTML +=`<p>Sorry, the word could be not found</p>`;
}
   
    console.log(data);
}