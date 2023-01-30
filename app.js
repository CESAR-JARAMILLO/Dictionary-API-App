// Regular element and container selectors
const body = document.querySelector('body')
const bodyContainer = document.querySelector("#body-container");
const toggleIcon = document.querySelector('.toggle-icon')
const dropdownContainer = document.querySelector('.dropdown-container')
const fontContainer = document.querySelector('.font-container')
const fontElements = fontContainer.querySelectorAll(".font");
const currentFont = document.querySelector(".current-font");
const input = document.querySelector('#search')
const hideContainer = document.querySelector('#hide-container')
const errorSpan = document.querySelector('span')
const whoopsContainer = document.querySelector('#whoops-container')

// API updated selectors
const wordText = document.querySelector('.word-text')
const phonetics = document.querySelector('.phonetics')
const nounDefinitions = document.querySelector('.noun-definitions')
const verbDefinitions = document.querySelector('.verb-definitions')
const synonym = document.querySelector('.synonym')
const example = document.querySelector('.example')
const sourceLink = document.querySelector('.source-link')
const playBtn = document.querySelector('.play-btn')

// Changes between light and dark mode
toggleIcon.addEventListener('click', () => {
  if(body.className === 'dark-mode') {
    body.classList = 'light-mode'
  } else {
    body.classList = 'dark-mode'
  }
})

// Toggles view of font container
dropdownContainer.addEventListener('click', () => {
  fontContainer.classList.toggle('hide')
})

// Updates body font-family
fontElements.forEach(font => {
    font.addEventListener("click", e => {
        fontElements.forEach(f => f.classList.remove("selected"));
        font.classList.add("selected");
        bodyContainer.style.fontFamily = window.getComputedStyle(font.querySelector("p"), null).getPropertyValue("font-family");
        currentFont.textContent = font.querySelector("p").textContent;
    });
});

// Input Submited
input.addEventListener('keyup', (e) => {
  if(e.key === 'Enter') {
    
    // Clears ul html
    nounDefinitions.innerHTML = ''
    verbDefinitions.innerHTML  = ''

    // Hides whoops container
    if(whoopsContainer.className === '') {
      whoopsContainer.classList.toggle('hide')
    }

    // Adds inbput error state
    if(input.value === '') {
      errorSpan.classList.toggle('hide')
      input.classList.toggle('error')
      return
    }

    // Removes input error state
    if(input.className === 'error') {
      errorSpan.classList.toggle('hide')
      input.classList.toggle('error')
    }

    const inputValue = input.value
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`;

    // Fetch API data
    fetch(url)
    .then(response => response.json())
    .then(data => {

      // API data variables
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

      // Displays main container
      if(hideContainer.className === 'hide') {
        hideContainer.classList.toggle('hide')
      }

    // Add data to page elements
      wordText.innerText = defWord
      phonetics.innerText = phoneticsText

      // Prevents error if nothing returned
      if (nounDef.length > 0) {
        nounDef.forEach(definition => {
          nounDefinitions.innerHTML += `<li>${definition.definition}</li>`
        });
      } else {
        nounDefinitions.innerHTML = '';
      }

      // Prevents error if nothing returned
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

      // Hides play btn
      if(phoneticsAudio === '') {
        playBtn.className = 'play-btn hide'
      } else {
        playBtn.href = phoneticsAudio
      }

  })
  .catch(error => {
    console.error('Error:', error)
    // Hides main container
    if(hideContainer.className === '') {
      hideContainer.classList.toggle('hide')
    }
    // Displays whoops container
    whoopsContainer.classList.toggle('hide')
  })

  }
})