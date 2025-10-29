const API = 'api.php';

const userLocale = navigator.language || 'pl-PL';
const formatter = new Intl.NumberFormat(userLocale);
const globalCounter = document.getElementById('globalCounter');
const localCounter = document.getElementById('localCounter');
const button = document.getElementById('button');

let globalClickCount = 0;
let localClickCount = 0;

function updateLocalCounterText() {
	localCounter.textContent = 'Your clicks: ' + formatter.format(localClickCount);
}

button.addEventListener('click', async () => {
	localClickCount++;
	updateLocalCounterText();
	localStorage.setItem('localClickCount', localClickCount.toString());
	const response = await fetch(API, { method: 'POST' });
	if (!response.ok) {
		console.error('HTTP error:', response.status);
		return;
	}
});

async function updateGlobalClicks() {
	try {
		const response = await fetch(API, { method: 'GET' });

		if (!response.ok) {
			console.error('HTTP error:', response.status);
			return;
		}

		const data = await response.json();
		globalClickCount = parseInt(data);
		globalCounter.textContent = 'All time clicks: ' + globalClickCount;
		// Antycheat, not too great but enough for kids changing the random values in F12
		if (globalClickCount > localClickCount) {
			localClickCount = 0;
		}
	} catch (error) {
		console.error('Fetch error:', error);
	}
}

setInterval(updateGlobalClicks, 5000);
updateGlobalClicks();

const saved = localStorage.getItem('localClickCount');
localClickCount = saved ? parseInt(saved) : 0;
updateLocalCounterText();
