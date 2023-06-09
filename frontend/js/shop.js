const messageContainer = document.getElementById('messageContainer');

// It is hardecoded, i dint find a workarroud to get all birds colors
const birdColors = [
    'Blue',
    'Groen',
    'Oranje',
    'Porpel',
    'Red',
    'Roze',
    'Yellow',
]

function makeShopCell(birdColor = 'Red') {
    const birdsShowCase = document.getElementById('birdsShowcase');
    const cell = document.createElement('div');
    
    // Consider making a funciton to make it more expensive
    const birdColorPrice = 20;

    cell.setAttribute('id', 'cell');
    cell.innerHTML += `
        <img src="./frontend/images/Birds/${birdColor}.png" alt="${birdColor} bird" />
        <h3>${birdColor}</h2>
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
    birdsShowCase.appendChild(cell)

    if (getColors().includes(birdColor)) 
        showBoughtMessage(birdColor);
}

function showBoughtMessage(birdColor) {
        document.getElementById(`buy-${birdColor}`).innerHTML =  
            `<p id="succesContainer">Color is already bought!</p>`
}

birdColors.forEach(function(color) {
    makeShopCell(color);
})


function updateMesageContainer(response) {
    messageContainer.innerHTML = response[1];
    messageContainer.setAttribute('id', response[0] ? 'succesContainer' : 'errorContainer')
}

function buyColor(price = 0, color = "") {
    const response = spendCoins(price);
    updateMesageContainer(response)

    if (!response[0]) 
       return;
    
    checkColors(color);
    showBoughtMessage(color);
    setPlayerCoins();
}

// Get all butons in a cell of the shop with the class "buy-button"
const buttons = document.getElementById('shopBox').querySelectorAll('.buy-button');

buttons.forEach(button => {
    button.addEventListener('click', function() { 
        const color = button.getAttribute('data-color');
        const price = Number(button.getAttribute('data-price'));
        buyColor(price, color);
    })
})

// Just for show the player coins 
function setPlayerCoins() {
  const coinsContainer = document.getElementById('coins');
  coinsContainer.innerHTML =  `
      ${getCookieData('coinAmount')} Coins
  `
}

setPlayerCoins();
