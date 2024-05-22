const svgSrc = {
    1: "../assets/book.svg",
    2: "../assets/chat.svg",
    3: "../assets/laptop.svg",
    4: "../assets/newspaper.svg",
    5: "../assets/openletter.svg",
    6: "../assets/paperplane.svg",
    7: "../assets/quil.svg",
    8: "../assets/stapler.svg",
    9: "../assets/truck.svg",
    10: "../assets/wifi.svg",
}


//create a function that generates a random number of 1-10 but does not repeat a number until all numbers have been used, to which the list is reset to empty and the process starts again
//youll notice here that the used numbers array is always reset to empty, this is because the function is called every time a new template is created, so the array will always be empty
//to fix this, the array should be stored in local storage and then retrieved when the function is called
function nonRepeatRandom(array) {
    let usedNumbers = array;
    let randomNumber = Math.floor(Math.random() * 10) + 1;
    if (usedNumbers.length === 10) {
        usedNumbers = [];
        usedNumbers.push(randomNumber);
        localStorage.setItem("usedNumbers", JSON.stringify(usedNumbers));
        return randomNumber;
    } else if (!usedNumbers.includes(randomNumber)) {
        usedNumbers.push(randomNumber);
        localStorage.setItem("usedNumbers", JSON.stringify(usedNumbers));
        return randomNumber;
    } else {
        return nonRepeatRandom(usedNumbers);
    }


}



//export this object to be used in other js file

export { svgSrc, nonRepeatRandom };
