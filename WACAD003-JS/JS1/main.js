const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

const storyText = 'Estava fazendo 34 graus lá fora, então :insertx: saiu para dar uma volta. Quando chegou em :inserty:, ficou olhando em choque por alguns instantes, então :insertz:. Ted viu tudo, mas não ficou surpreso — :insertx: pesa 136 quilos, e era um dia muito quente.';

const insertX = [
  'Barney Stinson',
  'Jon Snow',
  'Jinx'
];

const insertY = [
  'o MacLaren’s Pub',
  'Winterfell',
  'Zaun'
];

const insertZ = [
  'começou a contar uma história sem fim',
  'sacou uma espada e iniciou uma batalha',
  'causou uma explosão caótica'
];

randomize.addEventListener('click', result);

function result() {
  let newStory = storyText;

  const xItem = randomValueFromArray(insertX);
  const yItem = randomValueFromArray(insertY);
  const zItem = randomValueFromArray(insertZ);

  newStory = newStory.replaceAll(':insertx:', xItem);
  newStory = newStory.replaceAll(':inserty:', yItem);
  newStory = newStory.replaceAll(':insertz:', zItem);

  if (customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replaceAll('Ted', name);
  }

  if (document.getElementById("uk").checked) {
    const weight = `${Math.round(136 * 0.157)} stone`;
    const temperature = `${Math.round((34 * 9/5) + 32)} fahrenheit`;
    newStory = newStory.replaceAll('34 graus', temperature);
    newStory = newStory.replaceAll('136 quilos', weight);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}