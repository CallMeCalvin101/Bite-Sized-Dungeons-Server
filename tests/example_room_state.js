export default {
    "id": "EA9J6P", // room code
    "timeCreated": 1708767248108,
    "capacity": 4, // future-proofing + avoids using magic numbers in code
    "state": 0, // 0 = lobby, 1 = in-game
    "connectedClients": [
        // list of client session IDs, NOT socket IDs
    ],
    "players": [
        // list of client session IDs, NOT socket IDs
        // never larger than capacity
    ],
    // is a GameState structure if state = 1, otherwise undefined
    "gameState": undefined
}
