<?php

require_once __DIR__ . '/../connect.php';

function setCookies($playerName, $playerId) {
    setcookie("playerId", $playerId, time() + (86400 * 30 * 30 * 12), "/");
    setcookie("playerName", $playerName, time() + (86400 * 30 * 30 * 12), "/");
}

if (isset($_POST['playerName']) && !empty($_POST['playerName'])) {

    if (isset($_POST['playerId']) && $_POST['playerId'] !== 'false') {
        $playerId = (int) $_POST['playerId'];
        $sql = $conn->prepare("UPDATE players SET name = ? WHERE id = ?");
        $sql->bind_param('si', $_POST['playerName'], $playerId);
        if ($sql->execute()) {
            echo json_encode([
                'status' => true,
                'playerId' => $playerId,
                'playerName' => $_POST['playerName'],
                'message' => 'Updated player name'
            ]);
            setCookies($_POST['playerName'], $playerId);
            die();
        }
    }

    $sql = $conn->prepare("INSERT INTO players (name) VALUES (?)");
    $sql->bind_param('s', $_POST['playerName']);

    if ($sql->execute()) {
        $last_id = $conn->insert_id;
        setCookies($_POST['playerName'], $last_id);
        echo json_encode([
            'status' => true,
            'playerId' => $last_id,
            'playerName' => $_POST['playerName'],
            'message' => 'Added new player'
        ]);
        die();
    }
}

echo json_encode([
    'status' => false
]);
die();

