const socket = io.connect("http://localhost:9000");

const init = async () => {
  const initOrbs = await socket.emitWithAck("init", {
    playerName: player.name,
  });
  orbs = initOrbs;
  draw();
};
