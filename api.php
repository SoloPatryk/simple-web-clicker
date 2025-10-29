<?php
header('Content-Type: application/json');
$clicks = apcu_fetch('clicks') ?: 0;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Reading from clicks variable, and returning it to user
    print json_encode($clicks);
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Adding to clicks variable
    $clicks++;
    apcu_store('clicks', $clicks);
    print json_encode($clicks);
}
