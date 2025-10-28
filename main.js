const globalCounter = document.getElementById('globalCounter');
const localCounter = document.getElementById('localCounter');
const button = document.getElementById('button');

let globalClickCount = 0;
let localClickCount = 0;

button.addEventListener('click', () => {
	// fetch('api.php', {
	// 	method: 'POST',
	// })
	// 	.then((response) => response.json())
	// 	.then((data) => console.log(data));
	localClickCount++;
	localCounter.textContent = 'Your clicks: ' + localClickCount;
});
