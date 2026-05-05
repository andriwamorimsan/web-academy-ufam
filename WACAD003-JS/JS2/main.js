const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

const imageFilenames = [ 'pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg','pic5.jpg'];

const altText = [
  'lobo conjurando magia',
  'tarturga do elden ring',
  'musicholic',
  'silencio porfavor',
];

for (let i = 0; i < imageFilenames.length; i++) {
  const newImage = document.createElement('img');
  
  newImage.setAttribute('src', 'images/' + imageFilenames[i]);
  newImage.setAttribute('alt', altText[i]);

  thumbBar.appendChild(newImage);
  newImage.onclick = function (e) {
    const imgSrc = e.target.getAttribute('src');
    showImage(imgSrc);
  };
}

function showImage(src) {
  displayedImage.setAttribute('src', src); }

btn.onclick = function () {
  const currentClass = btn.getAttribute('class');

  if (currentClass === 'dark') {
    btn.setAttribute('class', 'light');
    btn.textContent = 'brilhar';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
  } else {
    btn.setAttribute('class', 'dark');
    btn.textContent = 'escurecer';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
};