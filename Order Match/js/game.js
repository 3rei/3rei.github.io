import { Customer } from './customer.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const backgroundImage = new Image();
backgroundImage.src = '../image/bg.png';  // Set the path to your background image
backgroundImage.onload = () => {
    console.log('Background image loaded successfully.');
};
backgroundImage.onerror = () => {
    console.error('Failed to load the background image.');
};

const items = [
    {name: 'mcspicy', src: 'image/mcspicy.png', x: 50, y: 450, width: 100, height: 100},
    {name: 'fries', src: 'image/fries.png', x: 200, y: 450, width: 100, height: 100},
    {name: 'drink', src: 'image/drink.png', x: 350, y: 450, width: 100, height: 100},
    {name: 'icecream', src: 'image/icecream.png', x: 500, y: 450, width: 100, height: 100},
];

let currentOrder = [];
let trayItems = [];
const itemsPerRow = 3;
let patienceTimer = null;

function startPatienceTimer() {
    if (patienceTimer !== null) {
        clearInterval(patienceTimer); // Clear existing timer if any
    }
    patienceTimer = setInterval(() => {
        currentCustomer.patience -= 1; // Decrement patience by 1 each second
        if (currentCustomer.patience <= 0) {
            clearInterval(patienceTimer);
            alert('Time out! You did not complete the order in time.');
            generateRandomOrder(); // Start with a new customer
        }
        drawItems(); // Redraw items to update the patience display
    }, 1000); // Update every second
}

items.forEach(item => {
    item.image = new Image();
    item.image.src = item.src;
});


Promise.all(items.map(item => new Promise((resolve, reject) => {
    item.image.onload = resolve;
    item.image.onerror = reject; // Add error handling for loading failure
})))
.then(startGame)
.catch(error => {
    console.error('Failed to load images:', error);
});

function generateRandomOrder() {
    selectRandomCustomer(); // This will automatically update the current order
}

let currentCustomer;

function startGame() {
    selectRandomCustomer(); // Selects and sets up a random customer
    drawItems();
    canvas.addEventListener('click', handleCanvasClick);
    document.getElementById('submitOrder').addEventListener('click', checkOrder);
}

function selectRandomCustomer() {
    const customerTypes = Object.keys(Customer.types);
    const randomType = customerTypes[Math.floor(Math.random() * customerTypes.length)];
    currentCustomer = new Customer(randomType);
    currentCustomer.generateOrder(items);
    currentOrder = currentCustomer.orderItems.map(item => item.name);
    startPatienceTimer(); // Start the timer for this customer
}

function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const maxItemsInTray = 6;

    items.forEach(item => {
        if (x >= item.x && x <= item.x + item.width && y >= item.y && y <= item.y + item.height) {
            if (trayItems.length < maxItemsInTray) {
                trayItems.push(Object.assign({}, item)); // Clone the item to allow duplicates
                drawItems();
            } else {
                alert('Tray is full. You cannot add more items.');
            }
        }
    });

    // Constants for the tray layout
    const rowHeight = 100;  // Height for each row
    const colWidth = 110;   // Width for each column, slightly wider than the item width

    // Implement removal of items from the tray by clicking on them
    trayItems.forEach((item, index) => {
        let row = Math.floor(index / itemsPerRow);
        let col = index % itemsPerRow;

        let trayX = 50 + (col * colWidth); // Calculate x position based on column index
        let trayY = 200 + (row * rowHeight); // Calculate y position based on row index

        if (x >= trayX && x <= trayX + item.width && y >= trayY && y <= trayY + item.height) {
            trayItems.splice(index, 1);
            drawItems();
            return;  // Exit after modifying the tray to prevent errors due to index shifting
        }
    });
}

function drawItems() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas

    // Draw the background image
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    ctx.font = "18px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Order for ${currentCustomer.type}: ${currentOrder.join(', ')}`, 10, 20);
    ctx.fillText(`Time remaining: ${Math.max(0, Math.floor(currentCustomer.patience))}s`, canvas.width - 200, 20);

    items.forEach(item => {
        ctx.drawImage(item.image, item.x, item.y, item.width, item.height);
    });

    trayItems.forEach((item, index) => {
        let row = Math.floor(index / itemsPerRow);
        let col = index % itemsPerRow;
        let trayX = 50 + (col * 110);
        let trayY = 200 + (row * 100);
        ctx.drawImage(item.image, trayX, trayY, item.width, item.height);
    });
}


function checkOrder() {
    let orderCounts = currentOrder.reduce((acc, itemName) => {
        acc[itemName] = (acc[itemName] || 0) + 1;
        return acc;
    }, {});

    let trayCounts = trayItems.reduce((acc, item) => {
        let itemName = item.name;
        acc[itemName] = (acc[itemName] || 0) + 1;
        return acc;
    }, {});

    let correct = Object.keys(orderCounts).length === Object.keys(trayCounts).length &&
                   Object.keys(orderCounts).every(itemName => orderCounts[itemName] === trayCounts[itemName]);

if (correct) {
        alert('Order correct! Generating new order for another customer.');
        generateRandomOrder(); // Will select a new customer and generate a new order
        trayItems = [];
        drawItems();
    } else {
        alert('Order incorrect, try again.');
    }
}

