const canvas = document.getElementById("board") as HTMLCanvasElement;

const lineColor = "yellow";
const canvasSize = 700;
const gameSize = 3;
const canvasSection = canvasSize / gameSize;
const context = canvas.getContext("2d")!;
const board = getInitialBoard("");

let turn_player = 1;

// Functions
// Initialize the board with a default value
function getInitialBoard(defaultValue: string): string[][]
{
    const board: string[][] = [];

    for (let x = 0; x < gameSize; x++) {
        board.push([]);
        for (let y = 0; y < gameSize; y++) {
            board[x].push(defaultValue);
        }
    }

    return board;
}

function drawLines(lineWidth, strokeStyle): void
{
    const lineStart = 4;
    const lineLength = canvasSize - 5;

    // Set the color to yellow
    context.lineWidth = lineWidth;
    context.lineCap = "round";
    context.strokeStyle = strokeStyle;
    
    // Start drawing
    context.beginPath();

    // Y lines
    for (let y = 1; y <= gameSize - 1; y++) {
        context.moveTo(lineStart, y * canvasSection);
        context.lineTo(lineLength, y * canvasSection);
    }
    // X lines
    for (let x = 1; x <= gameSize - 1; x++) {
        context.moveTo(x * canvasSection, lineStart);
        context.lineTo(x * canvasSection, lineLength);
    }

    // Draw
    context.stroke();
}

// Clear the playing area
function clearPlayingArea(x: number, y: number): void
{
    // Set the color to white
    context.fillStyle = "#fff";

    // Clear the section of the board
    context.fillRect(
        x, y,
        canvasSection,
        canvasSection,
    );
}

// Draw a X
function drawX(x: number, y: number): void
{
    const offset = 50;
    context.strokeStyle = "#00f";

    // Start drawing
    context.beginPath();

    // Move to the top left corner of the section
    context.moveTo(x + offset, y + offset);

    // Draw a line to the bottom right corner of the section
    context.lineTo(
        x + canvasSection - offset,
        y + canvasSection - offset
    );
    
    // Move to the bottom left corner of the section
    context.moveTo(x + offset, y + canvasSection - offset);

    // Draw line to the top right corner of the section
    context.lineTo(x + canvasSection - offset, y + offset);

    // Draw
    context.stroke();
}

// Draw an O
function drawO(x: number, y: number): void
{
    const halfSectionSize = 0.5 * canvasSection;
    const centerX = x + halfSectionSize;
    const centerY = y + halfSectionSize;
    const radius = (canvasSection - 100) / 2;
    const startAngle = 0 * Math.PI;
    const endAngle = 2 * Math.PI;

    // Set the color to red
    context.fillStyle = "#f00";
    context.lineWidth = 10;

    // Start drawing
    context.beginPath();

    // Draw a circle
    context.arc(
        centerX, centerY,
        radius,
        startAngle, endAngle
    );

    // Draw the circle
    context.stroke();
 }

// Add a playing piece to the board
function addPlayingPiece(mouse: {x: number, y: number}): void
{
    let xCordinate: number;
    let yCordinate: number;

    for (let x = 0; x < gameSize; x++) {
        for (let y = 0; y < gameSize; y++) {
            xCordinate = x * canvasSection;
            yCordinate = y * canvasSection;

            // Check if the mouse click was inside a section of the board
            if (
                mouse.x >= xCordinate && mouse.x <= xCordinate + canvasSection &&
                mouse.y >= yCordinate && mouse.y <= yCordinate + canvasSection
            ) {
                // Clear the section of the board
                clearPlayingArea(xCordinate, yCordinate);

                // Draw an X or an O
                if (turn_player === 1) drawX(xCordinate, yCordinate);
                else drawO(xCordinate, yCordinate);
            }
        }
    }
}

function getCanvasMousePosition(event: MouseEvent): {x: number, y: number}
{
    const rect = canvas.getBoundingClientRect();

    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

// Initialize the board
canvas.width = canvasSize;
canvas.height = canvasSize;
context.translate(0.5, 0.5);

// Draw the lines
drawLines(10, lineColor);

//// Events
// Add a playing piece to the board when user clicks
canvas.addEventListener("mouseup", function(event) {
    // Change the turn player
    if (turn_player === 1) turn_player = 2;
    else turn_player = 1;

    // Adding a playing piece to the board
    addPlayingPiece(
        getCanvasMousePosition(event)
    );
});
