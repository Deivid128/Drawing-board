const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

class Configurations {
    constructor(color = "black", width = "1") {
        this.lineColor = color;
        this.lineWidth = width;
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
    const rect = canvas.getBoundingClientRect();
    return {
        xPos: event.clientX - rect.left,
        yPos: event.clientY - rect.top,
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
}


canvas.addEventListener("mousedown", startDrawing, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stopDrawing, false);
canvas.addEventListener("mouseleave", stopDrawing, false);