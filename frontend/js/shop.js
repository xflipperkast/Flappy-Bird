const errorContainer = document.getElementById("errorContainer");
const succesContainer = document.getElementById("succesContainer");

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
    const shopBox = document.getElementById('shopBox');
    const cell = document.createElement('div');
    
    // Consider making a funciton to make it more expensive
    const birdColorPrice = 200;

    cell.setAttribute('id', 'cell');
    cell.innerHTML += `
        <img src="./frontend/images/Birds/${birdColor}.png" alt="${birdColor} bird" />
        <button id="buy${birdColor}" class="buy-button" data-color="Red" data-price=${birdColorPrice}>Buy this color</button>
        <div class="priceContainer">
          <p>Price: ${birdColorPrice}</p>
          <div class="coinImage"></div>
        </div>
    `;
    shopBox.insertBefore(cell, shopBox.firstChild);
}

birdColors.forEach(function(color) {
    makeShopCell(color);
})


function buyColor(price = 0, color = "") {
    const response = spendCoins(price);
    errorContainer.innerHTML = "";
    succesContainer.innerHTML = "";

    if (!response[0]) {
        errorContainer.innerHTML = response[1];
        return;
    }

    const colors = getColors();
    
    if (colors.includes(color)) {
        errorContainer.innerHTML = "Color is already bought!";
        spendCoins(-price);
        return;
    }

    succesContainer.innerHTML = response[1];
    checkColors(color);
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

