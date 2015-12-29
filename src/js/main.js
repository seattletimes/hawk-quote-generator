// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
var Blather = require("blather");

var qsa = s => Array.prototype.slice.call(document.querySelectorAll(s));

var samples = {
  bennett: require("../../data/bennett.txt"),
  carroll: require("../../data/carroll.txt"),
  sherman: require("../../data/sherman.txt"),
  thomas: require("../../data/thomas.txt"),
  wilson: require("../../data/wilson.txt")
};

var players = {};
for (var key in samples) {
  players[key] = new Blather();
  players[key].addText(samples[key]);
}

var outputDiv = document.querySelector(".output");

var generate = function() {
  var name = this.getAttribute("data-player");
  var player = players[name];
  var length = Math.ceil(Math.random() * 2) + 1;
  var output = [];
  for (var i = 0; i < length; i++) {
    output.push(player.sentence());
  }
  outputDiv.innerHTML = output.join(" ");
};

qsa(".request-quote").forEach(el => el.addEventListener("click", generate));