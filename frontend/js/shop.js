const messageContainer = document.getElementById('messageContainer');

const birdColors = [
    'Blue',
    'Green',
    'Orange',
    'Purple',
    'Red',
    'Pink'
];

function makeShopCell(birdColor = 'Red') {
    if (getColors().includes(birdColor)) return;
    const birdsShowCase = document.getElementById('birdsShowcase');
    const cell = document.createElement('div');
    
    const birdColorPrice = 200;

    cell.setAttribute('class', 'cell');
    cell.innerHTML += `
        <img src="./frontend/images/Birds/${birdColor}.png" alt="${birdColor} bird" />
        <h3>${birdColor} Bird</h3>
        <div id="buy-${birdColor}">
            <button id="buy${birdColor}" class="buy-button"
                data-color="${birdColor}" data-price=${birdColorPrice}>Buy this color</button>
        </div>
        <div class="priceContainer">
            <p class='${(getCookieData('coinAmount') < birdColorPrice) ? 'red' : 'blue'}'>
                Price: ${birdColorPrice}
            </p>
            <div class="coinImage"></div>
        </div>
    `;

    birdsShowCase.appendChild(cell);
}

birdColors.forEach(function(color) {
    makeShopCell(color);
});


function updateMesageContainer(response = [false, "Default value"]) {
    messageContainer.innerHTML = response[1];
    messageContainer.setAttribute('class', response[0] ? 'succesContainer' : 'errorContainer');
}

function buyColor(price = 0, color = "") {
    const response = spendCoins(price);
    updateMesageContainer(response);

    if (!response[0]) return;

    checkColors(color);
    setPlayerCoins();

    document.getElementById(`buy${color}`).style.display = "none";
}

const buttons = document.getElementById('shopBox').querySelectorAll('.buy-button');

buttons.forEach(button => {
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
