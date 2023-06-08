const redButton = document.getElementById("buyRed");
const blueButton = document.getElementById("buyBlue");
const errorContainer = document.getElementById("errorContainer");
const succesContainer = document.getElementById("succesContainer");

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

redButton.addEventListener('click', function() {buyColor(200, "Red")});
blueButton.addEventListener('click', function() {buyColor(200, "Blue")});
