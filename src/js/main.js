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

var lynch = require("../../data/lynch.txt").split("\n");

var players = {};
for (var key in samples) {
  players[key] = new Blather();
  players[key].addText(samples[key]);
}

var name = document.querySelector(".player-name");
var outputDiv = document.querySelector(".output");
var statusDiv = document.querySelector(".status");
var timeout = null;
var delay = 2000; // time to fake quote generation

var presentQuote = function(player, quote) {
  name.innerHTML = "";
  outputDiv.innerHTML = "";
  statusDiv.innerHTML = "Thinking...";

  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(function() {
    statusDiv.innerHTML = "";
    name.innerHTML = `${player} says:`;
    outputDiv.innerHTML = quote;
  }, delay);
}

var markov = function() {
  var name = this.getAttribute("data-player");
  var player = players[name];
  var length = Math.ceil(Math.random() * 2) + 1;
  var output = [];
  for (var i = 0; i < length; i++) {
    output.push(player.sentence());
  }
  presentQuote(this.innerHTML, output.join(" "));
};

var randomized = function() {
  presentQuote("Marshawn Lynch", lynch[Math.floor(Math.random() * lynch.length)]);
};

qsa(".blather").forEach(el => el.addEventListener("click", markov));
document.querySelector(".lynch").addEventListener("click", randomized);