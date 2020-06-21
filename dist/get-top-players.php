<?php
require_once __DIR__ . '/../connect.php';

$sql = "
    SELECT id, name, score FROM players WHERE score IS NOT NULL
    ORDER BY score DESC LIMIT 10
";
$result = $conn->query($sql);
$topPlayers = [];
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $topPlayers[] = [
        'id' => $row['id'],
        'name' => $row['name'],
        'score' => $row['score']
    ];
  }
}

echo json_encode($topPlayers);
die();

?>