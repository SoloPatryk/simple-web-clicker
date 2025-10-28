const API = 'api.php';

const userLocale = navigator.language || 'pl-PL';
const globalCounter = document.getElementById('globalCounter');
const localCounter = document.getElementById('localCounter');
const button = document.getElementById('button');

let globalClickCount = 0;
let localClickCount = 0;

function updateLocalCounterText() {
	const formatter = new Intl.NumberFormat(userLocale);
	localCounter.textContent = 'Your clicks: ' + formatter.format(localClickCount);
}

button.addEventListener('click', () => {
	localClickCount++;
	updateLocalCounterText();
	localStorage.setItem('localClickCount', localClickCount.toString());
});

async function updateGlobalClicks() {
	try {
		const response = await fetch(API, { method: 'GET' });

		if (!response.ok) {
			console.error('HTTP error:', response.status);
			return;
		}

		const data = await response.json();
		globalCounter.textContent = 'All time clicks: ' + data;
	} catch (error) {
		console.error('Fetch error:', error);
	}
}

setInterval(updateGlobalClicks, 5000);
updateGlobalClicks();

const saved = localStorage.getItem('localClickCount');
localClickCount = saved ? parseInt(saved) : 0;
updateLocalCounterText();
