var radius = 100; // radius of unit circle
var pSize = 4; // size of pole and zero graphic
var zSize = 4;
currentIndx = 0;
// flags to know which one to be moved
zeroFlag = false;
poleFlag = false;

var conjucateFlag = false;
var poles = [];
var tempPoles = [];
var Truepoles = [];
var zeros = [];
var z = [];
var p = [];
var tempZeros = [];
var Truezeros = [];
var conjucatedZeros = [];
var conjucatedPoles = [];
var Conj_Poles = [];
var Conj_Zeros = [];
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
Draw();

function Draw() {
  ctx.clearRect(0, 0, c.width, c.height);

  var pad = (c.width - 2 * radius) / 2; // padding on each side

  // unit circle
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.arc(radius + pad, radius + pad, radius, 0, 2 * Math.PI);
  ctx.stroke();
  // y axis
  ctx.beginPath();
  //ctx.lineWidth="1";
  ctx.strokeStyle = "lightgray";
  ctx.moveTo(radius + pad, 0);
  ctx.lineTo(radius + pad, c.height);
  ctx.font = "italic 8px sans-serif";
  ctx.fillText("Imaginary", radius + pad + 2, pad - 2);

  // x axis
  ctx.moveTo(0, radius + pad);
  ctx.lineTo(c.width, radius + pad);
  ctx.fillText("Real", radius + radius + pad + 2, radius + pad - 2);
  ctx.stroke(); // Draw it
  ctx.strokeStyle = "blue";
  var idx;
  Truepoles = [];
  for (idx = 0; idx < poles.length; idx++) {
    var x = poles[idx][0] - 10;
    var y = poles[idx][1] - 10;

    Truepoles.push([(x - 22 - radius) / radius, (radius - (y - 22)) / radius]);

    ctx.beginPath();
    ctx.moveTo(x - pSize, y - pSize);
    ctx.lineTo(x + pSize, y + pSize);
    ctx.moveTo(x - pSize, y + pSize);
    ctx.lineTo(x + pSize, y - pSize);
    ctx.stroke();
  }
  Truezeros = [];
  for (idx = 0; idx < zeros.length; idx++) {
    var x = zeros[idx][0] - 10;
    var y = zeros[idx][1] - 10;

    Truezeros.push([(x - 22 - radius) / radius, (radius - (y - 22)) / radius]);

    ctx.beginPath();
    ctx.arc(x, y, zSize, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

function AddPoles() {
  var x = radius + radius * 0.75;
  var y = radius - radius * 0.34;
  poles.push([x + 32, y + 32]);
  Draw();
}

function AddZeros() {
  var x = radius + radius * 0;
  var y = radius - radius * 0;
  zeros.push([x + 32, y + 32]);
  Draw();
}
function updateMenu() {}
function showCoords(event) {
  var x = event.offsetX;
  var y = event.offsetY;

  if (zeroFlag) {
    zeros[currentIndx][0] = x;
    zeros[currentIndx][1] = y;
    tempZeros = zeros;
    Draw();
    for (var idx = 0; idx < conjucatedZeros.length; idx++) {
      if (conjucatedZeros[idx][0] === currentIndx) {
        var conjIdx = conjucatedZeros[idx][1];
        Truezeros[conjIdx][0] = Truezeros[currentIndx][0];
        Truezeros[conjIdx][1] = -Truezeros[currentIndx][1];
        tempx = radius + radius * Truezeros[conjIdx][0];
        tempy = radius - radius * Truezeros[conjIdx][1];
        zeros[conjIdx] = [tempx + 32, tempy + 32];
      }
    }
  }
  if (poleFlag) {
    poles[currentIndx][0] = x;
    poles[currentIndx][1] = y;
    tempPoles = poles;
    Draw();
    for (var idx = 0; idx < conjucatedPoles.length; idx++) {
      if (conjucatedPoles[idx][0] === currentIndx) {
        var conjIdx = conjucatedPoles[idx][1];
        Truepoles[conjIdx][0] = Truepoles[currentIndx][0];
        Truepoles[conjIdx][1] = -Truepoles[currentIndx][1];
        tempx = radius + radius * Truepoles[conjIdx][0];
        tempy = radius - radius * Truepoles[conjIdx][1];
        poles[conjIdx] = [tempx + 32, tempy + 32];
      }
    }
  }
  Draw();
}

function Conjugate() {
  conjucateFlag = true;
  var x;
  var y;
  var tempx;
  var tempy;
  if (zeroFlag) {
    x = Truezeros[currentIndx][0];
    y = Truezeros[currentIndx][1];
    if (!Truezeros.includes([x, -y]) && !Conj_Zeros.includes(currentIndx)) {
      tempx = radius + radius * x;
      tempy = radius - radius * -y;
      zeros.push([tempx + 32, tempy + 32]);
      conjucatedZeros.push([currentIndx, zeros.length - 1]);
      Conj_Zeros.push(currentIndx);
    }
  } else if (poleFlag) {
    x = Truepoles[currentIndx][0];
    y = Truepoles[currentIndx][1];
    if (!Truepoles.includes([x, -y]) && !Conj_Poles.includes(currentIndx)) {
      tempx = radius + radius * x;
      tempy = radius - radius * -y;
      poles.push([tempx + 32, tempy + 32]);
      conjucatedPoles.push([currentIndx, poles.length - 1]);
      Conj_Poles.push(currentIndx);
    }
  }
  Draw();
}

function clearSelected() {
  if (zeroFlag) {
    zeros.splice(currentIndx, 1);
    for (var idx = 0; idx < conjucatedZeros.length; idx++) {
      if (conjucatedZeros[idx][0] === currentIndx) {
        var conjIdx = conjucatedZeros[idx][1] - 1;
        zeros.splice(conjIdx, 1);
        conjucatedZeros.splice(conjIdx, 1);
      }
    }
    Draw();
  } else if (poleFlag) {
    poles.splice(currentIndx, 1);
    for (var idx = 0; idx < conjucatedPoles.length; idx++) {
      if (conjucatedPoles[idx][0] === currentIndx) {
        var conjIdx = conjucatedPoles[idx][1] - 1;
        poles.splice(conjIdx, 1);
        conjucatedPoles.splice(conjIdx, 1);
      }
    }
    Draw();
  }
  calculate();
}
function cleaar(index) {
  if (index == 1) {
    zeros = [];
    conjucatedZeros = [];
    Conj_Zeros = [];
    Draw();
  }
  if (index == 2) {
    poles = [];
    conjucatedPoles = [];
    Conj_Poles = [];
    Draw();
  }
  if (index == 3) {
    poles = [];
    zeros = [];
    conjucatedZeros = [];
    conjucatedPoles = [];
    Conj_Zeros = [];
    Conj_Poles = [];
    Draw();
  }
  calculate();
}

function normalizePoint(p) {
  return [(p[0] - 132) / 100, (-p[1] + 132) / 100];
}

function calculate() {
  if (zeros.length == 0 && poles.length == 0) clearPlots();
  else {
    axios
      .post("/", {
        zeros: zeros.map((el) => normalizePoint(el)),
        poles: poles.map((el) => normalizePoint(el)),
        z: z.map((el) => normalizePoint(el)),
        p: p.map((el) => normalizePoint(el)),
      })
      .then(() => {
        refreshPlots();
      });
  }
}

function refreshPlots() {
  [
    ["plt1", "static/img/phase.png"],
    ["plt2", "static/img/mag.png"],
    ["plt3", "static/img/after_filter_phase.png"],
  ].forEach((plt) => {
    document
      .getElementById(plt[0])
      .setAttribute("src", plt[1] + "?t=" + new Date().getTime());
  });
}

function clearPlots() {
  [
    ["plt1", "static/img/empty.png"],
    ["plt2", "static/img/empty.png"],
    ["plt3", "static/img/empty.png"],
  ].forEach((plt) => {
    document
      .getElementById(plt[0])
      .setAttribute("src", plt[1] + "?t=" + new Date().getTime());
  });
}
