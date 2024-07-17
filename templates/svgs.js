const svgSrc = {
    1: "fa-solid fa-pen templateIcon",
    2: "fa-solid fa-computer templateIcon",
    3: "fa-solid fa-envelope-open-text templateIcon",
    4: "fa-solid fa-headset templateIcon",
    5: "fa-solid fa-person-chalkboard templateIcon",
    6: "fa-solid fa-envelopes-bulk templateIcon",
    7: "fa-solid fa-book-open-reader templateIcon",
    8: "fa-solid fa-paper-plane templateIcon",
    9: "fa-solid fa-paperclip templateIcon",
    10: "fa-solid fa-box-archive templateIcon",
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
