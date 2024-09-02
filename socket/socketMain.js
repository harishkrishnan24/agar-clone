const { io, app } = require("../server");

const Orb = require("./classes/Orb");

const orbs = [];

initGame();

io.on("connect", (socket) => {
  socket.emit("init", { orbs });
});

function initGame() {
  for (let i = 0; i < 500; i++) {
    orbs.push(new Orb());
  }
}
