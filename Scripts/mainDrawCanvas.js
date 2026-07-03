const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d", {
    willReadFrequently: true
});

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const background = "#ffffff";
context.fillStyle = background;
context.fillRect(0, 0, canvas.width, canvas.height);


class Configurations {
    constructor(color = "black", width = 1) {
        this.restoreArray = [];
        this.index = -1;
        this.lineColor = color;
        this.lineWidth = width || 1;
        this.isDrawing = false;
    }

    setAttribute(attribute, newValue) {
        if (attribute in this) {
            this[attribute] = newValue;
        };
    }
}

let configurations = new Configurations();

configurations.restoreArray.push(
    context.getImageData(0, 0, canvas.width, canvas.height)
);

configurations.setAttribute("index", 0);

function getClickPos(event) {
    return {
        xPos: event.clientX - canvas.offsetLeft,
        yPos: event.clientY - canvas.offsetTop,
    };
}

function draw(event) {
    if (event.button === 2) return;

    const { xPos, yPos } = getClickPos(event);

    if (configurations.isDrawing) {
        context.lineTo(xPos, yPos);
        context.lineWidth = configurations.lineWidth;
        context.strokeStyle = configurations.lineColor;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
    };

    event.preventDefault();
}

function startDrawing(event) {
    if (event.button === 2) return;

    const { xPos, yPos } = getClickPos(event);

    configurations.setAttribute("isDrawing", true);
    context.beginPath();
    context.moveTo(xPos, yPos);

    event.preventDefault();
}

function stopDrawing(event) {
    if (event.button === 2) return;

    if (configurations.isDrawing) {
        context.stroke();
        context.closePath();
        configurations.setAttribute("isDrawing", false);
    };

    event.preventDefault();

    if (event.type != "mouseout") {
        configurations.restoreArray.length = configurations.index + 1;
        configurations.restoreArray.push(context.getImageData(0, 0, canvas.width, canvas.height))
        configurations.setAttribute("index", configurations.index + 1);
    };
}

canvas.addEventListener("mousedown", startDrawing, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stopDrawing, false);
canvas.addEventListener("mouseout", stopDrawing, false);