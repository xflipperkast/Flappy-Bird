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
    const includesColor = getBoughtColors().includes(birdColor);
    const birdsShowCase = document.getElementById('birdsShowcase');
    const cell = document.createElement('div');

    let name = `${birdColor} Bird`;

    if (includesColor) {
        name += " (bought)";
    }

    cell.setAttribute('class', 'cell');
    cell.innerHTML += `
        <img src="./frontend/images/Birds/${birdColor}.png" alt="${birdColor} bird" />
        <h3>${name}</h3>
        <div id="buy-${birdColor}">
            <button id="buy${birdColor}" class="buy-button"
                data-color="${birdColor}" data-price=${birdColorPrice}>Buy this color</button>
            <button id="equip${birdColor}" class="equip-button"
                data-color="${birdColor}" style="display:${includesColor ? 'block' : 'none'};">${getColors().includes(birdColor) ? 'Unequip' : 'Equip'}</button>
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
    if (getBoughtColors().includes(color)) return;

    const response = spendCoins(price);
    updateMesageContainer(response);

    if (!response[0]) return;

    checkBoughtColors(color);
    checkColors(color);
    if (!buySound.paused) {
        buySound.currentTime = 0;
    }
    buySound.play();
    setPlayerCoins();

    document.getElementById(`buy${color}`).style.display = "none";
    document.getElementById(`equip${color}`).style.display = "block";

    birdColors.forEach(function(colorName) {
        const container = document.getElementById(colorName);
        const textContainer = container.firstElementChild;

        textContainer.setAttribute(
            'class', 
            !getBoughtColors().includes(colorName) ? getCookieData('coinAmount') < birdColorPrice ? 'red' : 'green' : 'blue'
        );
    });
}

function equipColor(color = "") {
    const colors = getColors();
    const boughtColors = getBoughtColors();

    if (boughtColors.includes(color)) {
        if (colors.includes(color)) {
            removeColor(color);
            document.getElementById(`equip${color}`).innerText = 'Equip';
        } else if (colors.length > 1) {
            checkColors(color);
            document.getElementById(`equip${color}`).innerText = 'Unequip';
        }
    }
}

function removeColor(colorToRemove) {
    const currentColors = getColors();
    const index = currentColors.indexOf(colorToRemove);

    if (index !== -1) {
        currentColors.splice(index, 1);
        const updatedColors = currentColors.join(",");
        setCookie(updatedColors, "colors");
        console.log("Removed color", colorToRemove);
    } else {
        console.log("Color not found in current colors", colorToRemove);
    }
}


const buttons = document.getElementById('shopBox').querySelectorAll('.buy-button');

buttons.forEach(function(button) {
    button.addEventListener('click', function() { 
        const color = button.getAttribute('data-color');
        const price = Number(button.getAttribute('data-price'));
        buyColor(price, color);
    });
});

const equipButtons = document.getElementById('shopBox').querySelectorAll('.equip-button');

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
