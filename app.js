const word = 'example';
const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    console.log(error)
  });
