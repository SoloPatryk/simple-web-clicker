<?php
// REQUIRES php-apcu PACKAGE INSTALLED TO WORK CORRECTLY!!!

// I dont need to explain this, dont I? :3
header('Content-Type: application/json');

// Fetching the clicks from file
$clicks = (int) file_get_contents('clicks');

// Checking if its get or post
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Reading from clicks variable, and returning it
    print json_encode($clicks);
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Adding to clicks variable and saving it to file
    $clicks++;
    echo json_encode($clicks);
    file_put_contents('clicks', $clicks, LOCK_EX);
}

// Retuning ok and quitting
http_response_code(200);
exit;