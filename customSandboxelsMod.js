// my custom Sandboxels mod!
runAfterLoad(function() {
    console.log("Thanks for using customSandboxelsMod.js! -ADtsd")
    console.log("customSandboxelsMod is hosted at https://github.com/Adtsd24/rep1/blob/main/customSandboxelsMod.js")
})

function toObject(color) {
  color = color.match(/\d+/g);
  return { r: color[0], g: color[1], b: color[2] };
}

function RGBToHex2(rgb) {
  var r = Math.min(255, parseInt(rgb.r));
  var g = Math.min(255, parseInt(rgb.g));
  var b = Math.min(255, parseInt(rgb.b));
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function acidReact(elem1, elem2, product1, product2, temp = 0) {
  if (elements[elem1] && elements[elem1].ignore) {
    if (product1 !== null) {
      if (product1 instanceof Array) {
        elements[elem1].ignore.push(...product1);
      } else {
        elements[elem1].ignore.push(product1);
      }
    }
    if (product2 !== null) {
      if (product2 instanceof Array) {
        elements[elem1].ignore.push(...product2);
      } else {
        elements[elem1].ignore.push(product2);
      }
    }
    elements[elem1].ignore.push(elem2);
  }
  if (elements[elem2] && elements[elem2].ignore) {
    if (product1 !== null) {
      if (product1 instanceof Array) {
        elements[elem2].ignore.push(...product1);
      } else {
        elements[elem2].ignore.push(product1);
      }
    }
    if (product2 !== null) {
      if (product2 instanceof Array) {
        elements[elem2].ignore.push(...product2);
      } else {
        elements[elem2].ignore.push(product2);
      }
    }
    elements[elem2].ignore.push(elem1);
  }
  if (product1 !== null)
    if (elements[product1] && elements[product1].ignore) {
      if (product2 !== null) elements[product1].ignore.push(product2);
      elements[product1].ignore.push(elem1);
      elements[product1].ignore.push(elem2);
    }
  if (product2 !== null)
    if (elements[product2] && elements[product2].ignore) {
      if (product1 !== null) elements[product2].ignore.push(product1);
      elements[product2].ignore.push(elem1);
      elements[product2].ignore.push(elem2);
    }
  if (!elements[elem1].reactions[elem2]) {
    elements[elem1].reactions[elem2] = { elem1: product1, elem2: product2, temp1: temp, temp2: temp };
  }
}

elements.ternium = {
  color: "#FFFFBF",
  behavior: behaviors.SOLID,
  ignore: ["oxygen"],
  tick: function (pixel) {
    let change = false;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (!(i === 0 && j === 0) && !isEmpty(pixel.x + i, pixel.y + j, true) && !elements[pixel.element].ignore.includes(pixelMap[pixel.x + i][pixel.y + j].element)) {
          if (!elements[pixelMap[pixel.x + i][pixel.y + j].element].hardness || Math.random() > elements[pixelMap[pixel.x + i][pixel.y + j].element].hardness) {
            changePixel(pixelMap[pixel.x + i][pixel.y + j], "fire");
            change = true;
          }
        }
      }
    }
    if (change) {
      changePixel(pixel, "fire");
    }
  },
  reactions: {
    oxygen: { elem1: "ternium_oxide", elem2: "hydrogen" },
  },
  state: "solid",
  category: "solids",
  density: 15,
  stain: 0,
};

elements.ternium_oxide = {
  color: "#FFFFBF",
  behavior: behaviors.SOLID,
  ignore: ["oxygen"],
  tick: function (pixel) {
    let change = false;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (!(i === 0 && j === 0) && !isEmpty(pixel.x + i, pixel.y + j, true) && !elements[pixel.element].ignore.includes(pixelMap[pixel.x + i][pixel.y + j].element)) {
          if (!elements[pixelMap[pixel.x + i][pixel.y + j].element].hardness || Math.random() > elements[pixelMap[pixel.x + i][pixel.y + j].element].hardness) {
            changePixel(pixelMap[pixel.x + i][pixel.y + j], "fire");
            change = true;
          }
        }
      }
    }
    if (change) {
      changePixel(pixel, "fire");
    }
  },
  reactions: {
    hydrogen: { elem1: "ternium", elem2: "oxygen" },
  },
  state: "solid",
  category: "solids",
  density: 18,
  stain: 0,
};
