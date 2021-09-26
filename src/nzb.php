<?php
header('Access-Control-Allow-Origin: *'); 
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');
    header('Content-Type: application/json');
    $yeet = array();
    $queries = array();

    parse_str($_SERVER['QUERY_STRING'], $queries);
    
    $query = urldecode($queries['q']);

    //$url = 'https://mypiratebay.club/search.php?q=' . urlencode($query). '&page=0&orderby=99';
    $url = 'https://api.nzbplanet.net/api?t=movie&imdbid='. $query .'&o=json&apikey=0e679ee10722f31599862d682760d22e';

    $response = file_get_contents($url);
    echo $response;
?>


