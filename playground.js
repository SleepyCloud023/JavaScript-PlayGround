const container = document.querySelector('#root');

const divFragment = document.createElement('div');
const h1_inside = document.createElement('h1');
divFragment.append(h1_inside);
container.appendChild(divFragment);
h1_inside.innerText = 'hello DOM!';
h1_inside.innerText = 'innerText is changing in real time!';
h1_inside.innerText = 'Continue...1';
h1_inside.innerText = 'Continue...2';
h1_inside.innerText = 'Continue...3';
h1_inside.innerText = 'Finished';



