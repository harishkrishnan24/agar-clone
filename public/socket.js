const socket = io.connect("http://localhost:9000");

const init = async () => {
  const initData = await socket.emitWithAck("init", {
    playerName: player.name,
  });
  setInterval(() => {
    socket.emit("tock", {
      xVector: player.xVector ?? 0.1,
      yVector: player.yVector ?? 0.1,
    });
  }, 33);
  orbs = initData.orbs;
  player.indexInPlayers = initData.indexInPlayers;
  draw();
};

socket.on("tick", (playersArray) => {
  players = playersArray;
  if (players[player.indexInPlayers].playerData) {
    player.locX = players[player.indexInPlayers].playerData.locX;
    player.locY = players[player.indexInPlayers].playerData.locY;
  }
});

socket.on("orbSwitch", (orbData) => {
  orbs.splice(orbData.capturedOrbI, 1, orbData.newOrb);
});

socket.on("playerAbsorbed", (absorbedData) => {
  document.querySelector(
    "#game-message"
  ).innerHTML = `${absorbedData.absorbed} was absorbed by ${absorbedData.absorbedBy}!`;
  document.querySelector("#game-message").style.opacity = 1;

  window.setTimeout(() => {
    document.querySelector("#game-message").style.opacity = 0;
  }, 2000);
});

socket.on("updateLeaderBoard", (leaderBoardArray) => {
  leaderBoardArray.sort((a, b) => b.score - a.score);
  document.querySelector(".leader-board").innerHTML = "";
  leaderBoardArray.forEach((player) => {
    if (!player.name) return;
    document.querySelector(
      ".leader-board"
    ).innerHTML += `<li class="leaderboard-player">${player.name}: ${player.score}</li>`;
  });
});
