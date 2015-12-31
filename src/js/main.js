// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");
var Blather = require("blather");
var shuffle = require("lodash.shuffle");

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
  var p = players[key] = new Blather();
  var sample = samples[key];
  sample = sample.replace(/\s'/g, " ").replace(/\.' /g, ". ").replace(/,'\s/g, ", ");
  sample = sample.replace(/(\.|\?|\!) /g, "$1|");
  sample.split("|").forEach(s => p.addText(s));
  // players[key].addText(sample);
}

var container = document.querySelector("main.interactive");
var nameElement = document.querySelector(".quoted");
var outputElement = document.querySelector(".output");
var timeout = null;
var delay = 1000; // time to fake quote generation

var presentQuote = function(player, quote) {
  container.classList.add("thinking");
  container.classList.remove("blank");
  container.classList.remove("fade");
  nameElement.innerHTML = "";
  outputElement.innerHTML = "";

  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(function() {
    container.classList.remove("thinking");
    container.classList.add("blank");
    var _ = container.offsetWidth; //reflow
    container.classList.add("fade");
    nameElement.innerHTML = player;
    outputElement.innerHTML = quote;
    container.classList.remove("blank");
  }, delay);
}

var markov = function() {
  var name = this.getAttribute("data-player");
  var player = players[name];
  var length = Math.ceil(Math.random() * 2) + 1;
  var output = [];
  //generate n 5-20 word sentences
  while (output.length < length) {
    var s = player.sentence();
    var l = s.split(" ").length;
    if (l >= 5 && l <= 20) output.push(s);
  }
  presentQuote(this.innerHTML, output.join(" "));
};

var randomized = function() {
  presentQuote("Marshawn Lynch", lynch[Math.floor(Math.random() * lynch.length)]);
};

qsa(".blather").forEach(el => el.addEventListener("click", markov));
document.querySelector(".lynch").addEventListener("click", randomized);