<?php
// REQUIRES php-apcu PACKAGE INSTALLED TO WORK CORRECTLY!!!

// I dont need to explain this, dont I? :3
header('Content-Type: application/json');

// Fetching the clicks from memory, or file if its not found in memory
$clicks = apcu_fetch('clicks') ?:
    ((is_file('clicks') ? (int) file_get_contents('clicks') : 0) ?:
        0);

// Fetching last saved date from memory
$lastSave = apcu_fetch('lastSave') ?: 0;
$time = time();

// Checking if its get or post
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Reading from clicks variable, and returning it
    print json_encode($clicks);
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Adding to clicks variable, and storing it in memory
    $clicks++;
    apcu_store('clicks', $clicks);
    echo json_encode($clicks);
}

// Checking if it has passed 5 min,
// if yes save to file, and update last saved date
if ($time - $lastSave >= 300) {
    file_put_contents('clicks', $clicks, LOCK_EX);
    apcu_store('lastSave', time());
}

// Retuning ok and quitting
http_response_code(200);
exit;