/*
    Generalised cookie functions
*/

const getCookieData = (cookieName = "") => {
    if (!cookieName) return "";
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for(let i = 0; i < cookieArray.length; i++) {
        const cookie = cookieArray[i];

        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }

        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }

    }

    return "";
}

// Never call this function outside of normal checks
// Please write checks for cookies if you wanna use this, you could overwrite stuff you dont want
function setCookie(cookieValue, cookieName = "", daysUntillExpire = 1000) {
    if (cookieName || cookieValue || daysUntillExpire) return;

    const date = new Date();
    date.setTime(date.getTime() + (daysUntillExpire*24*60*60*1000));
    const expires = "expires="+ date.toUTCString();

    const cookie = cookieName + "=" + cookieValue + ";" + expires.slice(0, -3) + "UTC;";
    document.cookie = cookie;
}

// This still needs to be used somewhere but for now it is unused code
function deleteCookie(cookieName = "") {
    document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC";
}

/*
    Cookies for the personal best
*/

// This checks if a cookie for max score needs to be set
function checkMaxScoreCookie(cookieValue = 0) {
    let cookie = getCookieData("maxScore");

    if (cookie == "" || Number(cookie) < cookieValue) {
        setCookie(cookieValue, "maxScore");
    }

}

checkMaxScoreCookie(0)

/* 
    Cookies for the coins
*/

function checkCoins(cookieValue = 0) {
    const cookieName = "coinAmount";
    const cookie = getCookieData(cookieName);

    if (cookie == "") {
        setCookie(cookieValue, cookieName);
        return;
    }

    cookieValue += Number(cookie);

    setCookie(cookieValue, cookieName);
}

checkCoins(0);

// This returns an array of a boolean if it has worked and a string of why it has failed or that is has passed
const spendCoins = (cookieValue = 0) => {
    const cookieName = "coinAmount";
    const cookie = getCookieData(cookieName);

    if (cookie == "") return [false, "Cookie not set! Fix this cause it auto sets it!"];

    const newValue = Number(cookie) - cookieValue;
    if (newValue < 0) return [false, "Not enough coins!"];

    setCookie(newValue, cookieName);
    return [true, "Coins spend and saved!"];
}

/*
    Cookies for shop
*/

function toArray(value = "") {
    let convertedString = value.slice(1);
    convertedString = convertedString.slice(0, -1);
    const returnedValue = convertedString.split(",");
    return returnedValue;
}

// Values that needs to be added to array as value passed
function checkColors(cookieValue = "Yellow") {
    const cookieName = "colors";
    const cookie = getCookieData(cookieName);

    if (cookie == "") {
        setCookie("[" + cookieValue + "]", cookieName);
    }

    let array = toArray(cookie);

    if (array.includes(cookieValue)) {
        return;
    }

    array.push(cookieValue);
    const valueForCookie = "[" + array.toString() + "]";

    setCookie(valueForCookie, cookieName);
}

checkColors("Yellow");

const getColors = () => { return toArray(getCookieData("colors")); }
