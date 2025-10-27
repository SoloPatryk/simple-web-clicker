<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Reading from clicks variable, and returning it to user
    print json_encode('3');
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Adding to clicks variable
    print json_encode('ok');
}
