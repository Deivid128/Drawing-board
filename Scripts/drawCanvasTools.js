const undoButton = document.getElementById("undo");
const redoButon = document.getElementById("redo");
const clearButton = document.getElementById("clear");
const colorField = document.getElementById("color");
const rangeWidthField = document.getElementById("rangeWidth");

const color_change = document.getElementById("color_change");
const color_red = document.getElementById("color_red");
const color_blue = document.getElementById("color_blue");
const color_green = document.getElementById("color_green");

color_change.style.backgroundColor = configurations.lineColor;

rangeWidthField.value = configurations.lineWidth;

function redo(event) {
    if (event.button === 2) return;
    if (configurations.index >= configurations.restoreArray.length - 1) {
        return;
    }
    configurations.setAttribute("index", configurations.index + 1);
    context.putImageData(configurations.restoreArray[configurations.index], 0, 0);
}

function undo(event) {
    if (event.button === 2) return;

    if (configurations.index <= 0) {
        clear(event);
    } else {
        configurations.setAttribute("index", configurations.index - 1);
        context.putImageData(configurations.restoreArray[configurations.index], 0, 0);
    };
}

function clear(event) {
    if (event.button === 2) return;

    context.fillStyle = background;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);

    configurations.setAttribute("restoreArray", []);
    configurations.setAttribute("index", -1);
}

function setColor(color, isManualChange = false) {
    console.log(color);

    if (color != null) {
        configurations.setAttribute("lineColor", color);

        if (isManualChange) configurations.setAttribute("colorIndex", configurations.colorIndex + 1);

        if (configurations.colorIndex === 3) {
            color_change.style.backgroundColor = color;
            configurations.setAttribute("restoreColor", color);
            configurations.setAttribute("colorIndex", 0);
        };
    };
}

function getWidth(event) {
    if (event.button === 2) return;

    const range = rangeWidthField.value;

    if (range != null) {
        configurations.setAttribute("lineWidth", Number(range));
    };
}

clearButton.addEventListener("mousedown", clear, false);
colorField.addEventListener("change", () => {
    const color = colorField.value;

    if (color != null) {
        setColor(color, true);
    };
}, false);
rangeWidthField.addEventListener("change", getWidth, false);
undoButton.addEventListener("mousedown", undo, false);
redoButon.addEventListener("mousedown", redo, false);

color_change.addEventListener("mousedown", () => setColor(configurations.restoreColor));
color_red.addEventListener("mousedown", () => setColor("red"));
color_blue.addEventListener("mousedown", () => setColor("blue"));
color_green.addEventListener("mousedown", () => setColor("green"));

document.addEventListener("keydown", (e) => {
    if (!e.ctrlKey) return;

    if (e.key.toLowerCase() === "z") {
        e.preventDefault();
        undo(e);
    } else if (e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo(e);
    }

});