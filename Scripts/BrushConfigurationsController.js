const undoButton = document.getElementById("undo");
const clearButton = document.getElementById("clear");
const colorField = document.getElementById("color");
const rangeWidthField = document.getElementById("rangeWidth");

rangeWidthField.value = configurations.lineWidth;

function undo(event) {
    if (configurations.index <= 0) {
        clear();
    } else {
        configurations.setAttribute("index", configurations.index-1);
        configurations.restoreArray.pop();
        context.putImageData(configurations.restoreArray[configurations.index], 0, 0);
    };
}

function clear() {
    context.fillStyle = background;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);


    configurations.setAttribute("restoreArray", []);
    configurations.setAttribute("index", -1);
}

function getColor() {
    const color = colorField.value;

    if (color != null) {
        configurations.setAttribute("lineColor", color);
    };

}

function getWidth() {
    const range = rangeWidthField.value;

    if (range != null) {
        configurations.setAttribute("lineWidth", range);
    };

    event.preventDefault();
}

clearButton.addEventListener("click", clear, false);
colorField.addEventListener("change", getColor, false);
rangeWidthField.addEventListener("change", getWidth, false);
undoButton.addEventListener("click", undo, false);