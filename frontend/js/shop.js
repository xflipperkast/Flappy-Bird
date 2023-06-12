const messageContainer = document.getElementById('messageContainer');

const birdColors = [
    'Blue',
    'Green',
    'Orange',
    'Purple',
    'Red',
    'Pink',
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

const buttons = document.getElementById('shopBox').querySelectorAll('.buy-button');

buttons.forEach(function(button) {
    button.addEventListener('click', function() { 
        const color = button.getAttribute('data-color');
        const price = Number(button.getAttribute('data-price'));
        buyColor(price, color);
    });
});

function setPlayerCoins() {
    const coinsContainer = document.getElementById('coins');
    coinsContainer.innerHTML = `You have ${getCookieData('coinAmount') || 0}<div id="coinCounterImage"></div>`;
}

setPlayerCoins();
