const messageContainer = document.getElementById('messageContainer');
const buySound = new Audio('./frontend/sounds/buy.mp3');

const birdColors = [
    'Yellow',
    'Blue',
    'Green',
    'Orange',
    'Purple',
    'Red',
    'Pink',
    'Gray',
    'Doge',
    'Police',
    'Glasses',
    'Dude',
    'Sad',
    'Speed',
    'Girl',
    'Propellor',
    'Fishy',
    'Floppy',
    'Chuck',
    'GreenFish',
    'Jungle',
    'Rainbow',
    'Bubble'
];

const birdColorPrice = 200;

function makeShopCell(birdColor = 'Red') {
    const includesColor = getColors().includes(birdColor);
    const birdsShowCase = document.getElementById('birdsShowcase');
    const cell = document.createElement('div');
    const isCurrentColor = getCookieData('currentColor') === birdColor;

    let name = `${birdColor} Bird`;

    if (includesColor) {
        name += " (bought)";
    }

    cell.setAttribute('class', 'cell');
    cell.innerHTML += `
        <img src="./frontend/images/Birds/${birdColor}.png" alt="${birdColor} bird" />
        <h3>${name}</h3>
        <div id="equip-${birdColor}">
            <button id="equip${birdColor}" class="equip-button"
                data-color="${birdColor}">${isCurrentColor ? 'Unequip' : 'Equip'}</button>
        </div>
        <div id="buy-${birdColor}">
            <button id="buy${birdColor}" class="buy-button"
                data-color="${birdColor}" data-price=${birdColorPrice}>Buy this color</button>
        </div>
        <div class="priceContainer" id="${birdColor}">
            <p class='${
                !includesColor ? getCookieData('coinAmount') < birdColorPrice ? 'red' : 'green' : 'blue'
            }'>
                Price: ${birdColorPrice}
            </p>
            <div class="coinImage"></div>
        </div>
    `;

    birdsShowCase.appendChild(cell);

    if (includesColor) {
        document.getElementById(`buy${birdColor}`).style.display = "none";
    }
}

birdColors.forEach(function(color) {
    makeShopCell(color);
});

function updateMesageContainer(response = [false, "Default value"]) {
    messageContainer.innerHTML = response[1];
    messageContainer.setAttribute('class', response[0] ? 'succesContainer' : 'errorContainer');
}

function buyColor(price = 0, color = "") {
    if (getColors().includes(color)) return;

    const response = spendCoins(price);
    updateMesageContainer(response);

    if (!response[0]) return;

    checkColors(color);
    if (!buySound.paused) {
        buySound.currentTime = 0;
    }
    buySound.play();
    setPlayerCoins();

    document.getElementById(`buy${color}`).style.display = "none";

    birdColors.forEach(function(colorName) {
        const container = document.getElementById(colorName);
        const textContainer = container.firstElementChild;

        textContainer.setAttribute(
            'class', 
            !getColors().includes(colorName) ? getCookieData('coinAmount') < birdColorPrice ? 'red' : 'green' : 'blue'
        );
    });
}
function equipColor(color = "") {
    const currentColor = getCookieData('currentColor');
    const colors = getColors();

    if (currentColor === color) {
        if (colors.length > 1) {
            setCookie(colors.find(c => c !== color), 'currentColor'); // Changed setCookieData to setCookie
            document.getElementById(`equip${color}`).textContent = 'Equip';
        } 
    } else {
        setCookie(color, 'currentColor'); // Changed setCookieData to setCookie
        if (currentColor) {
            document.getElementById(`equip${currentColor}`).textContent = 'Equip';
        }
        document.getElementById(`equip${color}`).textContent = 'Unequip';
    }
}


const buyButtons = document.getElementById('shopBox').querySelectorAll('.buy-button');
const equipButtons = document.getElementById('shopBox').querySelectorAll('.equip-button');

buyButtons.forEach(function(button) {
    button.addEventListener('click', function() { 
        const color = button.getAttribute('data-color');
        const price = Number(button.getAttribute('data-price'));
        buyColor(price, color);
    });
});

equipButtons.forEach(function(button) {
    button.addEventListener('click', function() { 
        const color = button.getAttribute('data-color');
        equipColor(color);
    });
});

function setPlayerCoins() {
    const coinsContainer = document.getElementById('coins');
    coinsContainer.innerHTML = `You have ${getCookieData('coinAmount') || 0}<div id="coinCounterImage"></div>`;
}

setPlayerCoins();
