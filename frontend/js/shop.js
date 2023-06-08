const redButton = document.getElementById("buyRed");
const blueButton = document.getElementById("buyBlue");
const errorContainer = document.getElementById("errorContainer");
const succesContainer = document.getElementById("succesContainer");

redButton.addEventListener('click', function() {
    const response = spendCoins(200);
    errorContainer.innerHTML = "";
    succesContainer.innerHTML = "";

    if (response[0]) {
        succesContainer.innerHTML = response[1];
        checkColors("Red");
        return;
    }

    errorContainer.innerHTML = response[1];
});

blueButton.addEventListener('click', function() {
    const response = spendCoins(200);
    errorContainer.innerHTML = "";
    succesContainer.innerHTML = "";

    if (response[0]) {
        succesContainer.innerHTML = response[1];
        checkColors("Blue");
        return;
    }

    errorContainer.innerHTML = response[1];
});