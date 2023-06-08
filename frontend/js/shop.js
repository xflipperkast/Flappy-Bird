const redButton = document.getElementById("buyRed");
const blueButton = document.getElementById("buyBlue");
const errorContainer = document.getElementById("errorContainer");
const succesContainer = document.getElementById("succesContainer");

function buyColor(price = 0, color = "") {
    const response = spendCoins(price);
    errorContainer.innerHTML = "";
    succesContainer.innerHTML = "";

    if (response[0]) {
        succesContainer.innerHTML = response[1];
        checkColors(color);
        return;
    }

    errorContainer.innerHTML = response[1];
}

redButton.addEventListener('click', function() {buyColor(200, "Red")});

blueButton.addEventListener('click', function() {buyColor(200, "Blue")});
