<?php
// REQUIRES php-apcu PACKAGE INSTALLED TO WORK CORRECTLY!!!

// I dont need to explain this, dont I? :3
header('Content-Type: application/json');

// Fetching the clicks from memory
$clicks = apcu_fetch('clicks') ?: 0;

// Checking if its get or post
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Reading from clicks variable, and returning it
    print json_encode($clicks);

    // Retuning ok and quitting
    http_response_code(200);
    exit;
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Adding to clicks variable, and storing it in memory
    $clicks++;
    apcu_store('clicks', $clicks);

    // Retuning ok and quitting
    http_response_code(200);
    exit;
}
