const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const background = "#ffffff";
context.fillStyle = background;
context.fillRect(0, 0, canvas.width, canvas.height);

class Configurations {
    constructor(color = "black", width = "1") {
        this.restoreArray = [];
        this.index = -1;
        this.lineColor = color;
        this.lineWidth = Number(width) === 0? "1": width;
        this.isDrawing = false;
    }

    setAttribute(attribute, newValue) {
        if (this[attribute] != null) {
            this[attribute] = newValue;
        };
    }
}

let configurations = new Configurations();

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
        configurations.restoreArray.push(context.getImageData(0, 0, canvas.width, canvas.height))
        configurations.setAttribute("index", configurations.index + 1);
    };

    console.log(configurations);
    
}

canvas.addEventListener("mousedown", startDrawing, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stopDrawing, false);
canvas.addEventListener("mouseout", stopDrawing, false);