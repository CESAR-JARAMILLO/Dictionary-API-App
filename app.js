const toggleIcon = document.querySelector('.toggle-icon')
const body = document.querySelector('body')
const dropdownContainer = document.querySelector('.dropdown-container')
const fontContainer = document.querySelector('.font-container')
const fontElements = fontContainer.querySelectorAll(".font");
const bodyContainer = document.querySelector("#body-container");
const currentFont = document.querySelector(".current-font");
const input = document.querySelector('#search')
const hideContainer = document.querySelector('#hide-container')
const errorSpan = document.querySelector('span')

const wordText = document.querySelector('.word-text')
const phonetics = document.querySelector('.phonetics')
const nounDefinitions = document.querySelector('.noun-definitions')
const verbDefinitions = document.querySelector('.verb-definitions')
const synonym = document.querySelector('.synonym')
const example = document.querySelector('.example')
const sourceLink = document.querySelector('.source-link')
const playBtn = document.querySelector('.play-btn')

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

input.addEventListener('keyup', (e) => {
  if(e.key === 'Enter') {
    if(input.value === '') {
      errorSpan.classList.toggle('hide')
      input.classList.toggle('error')
      return
    }

  if(input.className === 'error') {
    errorSpan.classList.toggle('hide')
    input.classList.toggle('error')
  }

  const inputValue = input.value
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`;

  fetch('data.json')
  .then(response => response.json())
  .then(data => {
      const defWord = data[0].word
      const phoneticsText = data[0].phonetics[0].text
      const phoneticsAudio = data[0].phonetics[2].audio
      const nounDef = data[0].meanings[0].definitions
      // const nounExample = data[0].meanings[0].definitions[0].example
      const verbDef = data[0].meanings[1].definitions
      const verbExample = data[0].meanings[1].definitions[0].example
      const synonymsList = data[0].meanings[0].synonyms
      const sourceUrl = data[0].sourceUrls
      console.log(phoneticsAudio)

      if(hideContainer.className === 'hide') {
        hideContainer.classList.toggle('hide')
      }

      wordText.innerText = defWord
      phonetics.innerText = phoneticsText
      if (nounDef.length > 0) {
        nounDef.forEach(definition => {
          nounDefinitions.innerHTML += `<li>${definition.definition}</li>`
        });
      } else {
        nounDefinitions.innerHTML = '';
      }
      
      if (verbDef.length > 0) {
        verbDef.forEach(definition => {
          verbDefinitions.innerHTML += `<li>${definition.definition}</li>`
        });
      } else {
        verbDefinitions.innerHTML = '';
      }
      
      synonym.innerText = synonymsList[0]
      example.innerText = verbExample
      sourceLink.innerText = sourceUrl
      if(phoneticsAudio === '') {
        playBtn.className = 'play-btn hide'
      } else {
        playBtn.href = phoneticsAudio
      }

  })
  .catch(error => {
    console.error('Error:', error)
  })

  }
})