// api path
const api = 'api.php';

// Trying to get users locale and display numbers in it, as fallback use polish (100 000)
const userLocale = navigator.language || 'pl-PL';
const formatter = new Intl.NumberFormat(userLocale);

// getting the Text boxes and button
const globalCounter = document.getElementById('globalCounter');
const localCounter = document.getElementById('localCounter');
const button = document.getElementById('button');

// declaring the variables
let globalClickCount = 0;
let localClickCount = 0;

// Updating the global clicks text box
function updateLocalCounterText() {
	localCounter.textContent = 'Your clicks: ' + formatter.format(localClickCount);
}

// Updating the local clicks text box
function updateGlobalCounterText() {
	// Antycheat, not too great but enough for kids changing the random values in debugger
	// Checks if the value of clicks by everyone is smaller than local click count,
	// if its true it resets local clicks to 0
	if (globalClickCount < localClickCount) {
		localClickCount = 0;
		updateLocalCounterText();
		localStorage.setItem('localClickCount', localClickCount.toString());
	}

	globalCounter.textContent = 'All time clicks: ' + globalClickCount;
}

// Logic on button press
button.addEventListener('click', async () => {
	try {
		// Updating the local count
		localClickCount++;
		updateLocalCounterText();
		localStorage.setItem('localClickCount', localClickCount.toString());

		// Adding 1 to global click, instead of refetching the data from server every click
		globalClickCount++;
		updateGlobalCounterText();

		// Updating the global count
		const response = await fetch(api, { method: 'POST' });
		if (!response.ok) {
			console.error('HTTP error:', response.status);
		}
	} catch (error) {
		console.error('Failed to register click: ', error);
	}
});

// Logic to update fetch the global clicks from server
async function updateGlobalClicks() {
	try {
		const response = await fetch(api, { method: 'GET' });
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

// Setting the updating glbal click to run every 5 sec
setInterval(updateGlobalClicks, 5000);

// Things to do after a page has been loaded
window.addEventListener('load', () => {
	// Updating global clicks, so it doesnt show 0 for first 5 seconds
	updateGlobalClicks();

	// Reading the local clicks from browser memory, if it exists
	const saved = localStorage.getItem('localClickCount');
	localClickCount = saved ? parseInt(saved) : 0;
	updateLocalCounterText();
});
