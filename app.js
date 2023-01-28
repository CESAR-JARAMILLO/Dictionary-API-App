const toggleIcon = document.querySelector('.toggle-icon')
const body = document.querySelector('body')
const dropdownContainer = document.querySelector('.dropdown-container')
const fontContainer = document.querySelector('.font-container')

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
