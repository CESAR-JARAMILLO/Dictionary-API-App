const toggleIcon = document.querySelector('.toggle-icon')
const body = document.querySelector('body')
const dropdownContainer = document.querySelector('.dropdown-container')
const fontContainer = document.querySelector('.font-container')
const fontElements = fontContainer.querySelectorAll(".font");
const bodyContainer = document.querySelector("#body-container");
const currentFont = document.querySelector(".current-font");

// const word = document.querySelector('h1')

toggleIcon.addEventListener('click', () => {
  if(body.className === 'dark-mode') {
    body.classList = 'light-mode'
  } else {
    body.classList = 'dark-mode'
  }
})

dropdownContainer.addEventListener('click', () => {
  fontContainer.classList.toggle('hide')
})

fontElements.forEach(font => {
    font.addEventListener("click", e => {
        fontElements.forEach(f => f.classList.remove("selected"));
        font.classList.add("selected");
        bodyContainer.style.fontFamily = window.getComputedStyle(font.querySelector("p"), null).getPropertyValue("font-family");
        currentFont.textContent = font.querySelector("p").textContent;
    });
});

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const defWord = data[0].word
    const phoneticsText = data[0].phonetics[0].text
    const phoneticsAudio = data[0].phonetics[0].audio
    const nounDef = data[0].meanings[0].definitions[0].definition
    const nounExample = data[0].meanings[0].definitions[0].example
    const verbDef = data[0].meanings[1].definitions[0].definition
    const verbExample = data[0].meanings[1].definitions[0].example
    const synonymsList = data[0].meanings[0].synonyms
    const sourceUrl = data[0].sourceUrls
    console.log(synonymsList[0])
    // word.innerText = defWord
  })
  .catch(error => {
    console.error('Error:', error)
  })


// const word = 'keyboard';
// const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data)
//   })
//     .then(data => {
//       console.log(data[0].meanings[0])
//       console.log(data[0].word)
//       console.log(data)
//       console.log(data[0].phonetics[2].text)
//       console.log(data[0].phonetics[2].audio)
//       console.log(data[0].meanings.forEach(obj => {
//         console.log(obj.partOfSpeech)
//         console.log(obj.definitions[0].definition)
//         console.log(obj.definitions[0].example)
//       }))
//       console.log(data[0].meanings[0].synonyms)
//       console.log(data[0].sourceUrls)
//     })
//   .catch(error => {
//     console.log(error)
//   });
