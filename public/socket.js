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
  player.locX = players[player.indexInPlayers].playerData.locX;
  player.locY = players[player.indexInPlayers].playerData.locY;
});
