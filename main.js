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
function updateGlobalCounterText() {
	// Antycheat, not too great but enough for kids changing the random values in F12
	if (globalClickCount < localClickCount) {
		localClickCount = 0;
		updateLocalCounterText();
		localStorage.setItem('localClickCount', localClickCount.toString());
	} // had to remove it, it was reseting progress on page reload, and i dont want ppl to lose progress :3
	// nwm my bad, its fine I just put it in wrong function
	globalCounter.textContent = 'All time clicks: ' + globalClickCount;
}

button.addEventListener('click', async () => {
	try {
		localClickCount++;
		updateLocalCounterText();
		localStorage.setItem('localClickCount', localClickCount.toString());
		const response = await fetch(API, { method: 'POST' });
		if (!response.ok) {
			console.error('HTTP error:', response.status);
		}
		globalClickCount++;
		updateGlobalCounterText();
	} catch (error) {
		console.error('Failed to register click: ', error);
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
		updateGlobalCounterText();
	} catch (error) {
		console.error('Fetch error:', error);
	}
}

setInterval(updateGlobalClicks, 5000);

window.addEventListener('load', async () => {
	updateGlobalClicks();

	const saved = localStorage.getItem('localClickCount');
	localClickCount = saved ? parseInt(saved) : 0;
	updateLocalCounterText();
});
