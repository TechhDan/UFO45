<?php

require_once __DIR__ . '/../connect.php';

$playerScore = (int) $_GET['playerScore'];
$playerId = (int) $_GET['playerId'];
$playerIndex = null;
$playerHighScore = 0;

$sql = "SELECT score FROM `players` WHERE id = {$playerId}";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $playerHighScore = (int) $row['score'];
    }
}

if ($playerScore > $playerHighScore) {
    $sql = "UPDATE players SET score = ${playerScore} WHERE id = {$playerId}";
    if (!$conn->query($sql)) {
        $result = [
            'success' => false,
            'message' => 'Error updating record ' . $conn->error
        ];
        echo json_encode($result);
        die();
    }
}

$sql = "SELECT id, name, score FROM `players` ORDER BY score DESC";
$result = $conn->query($sql);

$players = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $players[] = [
            'id' => (int) $row['id'],
            'name' => $row['name'],
            'score' => (int) $row['score']
        ];
    }
}

$topScore = 0;
$currentRank = 1;
foreach ($players as $index => &$player) {
    if ($player['id'] === $playerId) {
        $playerIndex = $index;
    }
    if ($player['score'] >= $topScore) {
        $topScore = $player['score'];
        $player['rank'] = $currentRank;
    } else {
        $currentRank++;
        $topScore = $player['score'];
        $player['rank'] = $currentRank;
    }
}

if (isset($players[$playerIndex - 4])) {
    $result = array_slice($players, $playerIndex - 4, 10);
} else if (isset($players[$playerIndex - 3])) {
    $result = array_slice($players, $playerIndex - 3, 10);
} else if (isset($players[$playerIndex - 2])) {
    $result = array_slice($players, $playerIndex - 2, 10);
} else if (isset($players[$playerIndex - 1])) {
    $result = array_slice($players, $playerIndex - 1, 10);
}  else {
    $result = array_slice($players, $playerIndex, 10);
}

/*var_dump($result);
die();*/

echo json_encode($result);
die();
