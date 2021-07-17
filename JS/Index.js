let isDepression = document.getElementById("Depression");
let isExercise = document.getElementById("Exercise");
let isSun = document.getElementById("Sun");


let isRain = document.getElementById("Rain");
let isMaxTemp = document.getElementById("MaxTemp");
let isMeanTemp = document.getElementById("MeanTemp");
let isMinTemp = document.getElementById("MinTemp");

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('Depression').addEventListener('change', depressionChangeHandler);
});
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('Exercise').addEventListener('change', exerciseChangeHandler);
});
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('Sun').addEventListener('change', sunChangeHandler);
});
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('Rain').addEventListener('change', rainChangeHandler);
});
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('MaxTemp').addEventListener('change', maxTempChangeHandler);
});
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('MeanTemp').addEventListener('change', meanTempChangeHandler);
});
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('MinTemp').addEventListener('change', minTempChangeHandler);
});


function depressionChangeHandler() {
    let getNumber = switchCaseNumberGetter();
    switchCaseHandler(getNumber);
}

function exerciseChangeHandler() {

    let getNumber = switchCaseNumberGetter();
    switchCaseHandler(getNumber);

}
function switchCaseNumberGetter() {
    let switchnumber = "";
    if (isDepression.checked) {
        switchnumber += "1";
    }
    else {
        switchnumber += "0";
    }

    if (isExercise.checked) {
        switchnumber += "1";
    }
    else {
        switchnumber += "0";
    }
    if (isSun.checked) {
        switchnumber += "1";
    }
    else {
        switchnumber += "0";
    }
    if (isRain.checked) {
        switchnumber += "1"
    }
    else {
        switchnumber += "0";
    }
    if (isMaxTemp.checked) {
        switchnumber += "1"
    }
    else {
        switchnumber += "0";
    }
    if (isMeanTemp.checked) {
        switchnumber += "1";
    }
    else {
        switchnumber += "0";
    }
    if (isMinTemp.checked) {
        switchnumber += "1"
    }
    else {
        switchnumber += "0";
    }
    return switchnumber;
}
function switchCaseHandler(switchnumber) {
    switch (switchnumber) {


        case '0000001':
            console.log('Min, ');
            break;

        case '0000010':
            console.log('Mean, ');
            break;

        case '0000011':
            console.log('Mean, Min, ');
            break;

        case '0000100':
            console.log('Max,');
            break;

        case '0000101':
            console.log('Max,Min, ');
            break;

        case '0000110':
            console.log('Max,Mean, ');
            break;

        case '0000111':
            console.log('Max,Mean, Min, ');
            break;

        case '0001000':
            console.log('Rain, ');
            break;

        case '0001001':
            console.log('Rain, Min, ');
            break;

        case '0001010':
            console.log('Rain, Mean, ');
            break;

        case '0001011':
            console.log('Rain, Mean, Min, ');
            break;

        case '0001100':
            console.log('Rain, Max,');
            break;

        case '0001101':
            console.log('Rain, Max,Min, ');
            break;

        case '0001110':
            console.log('Rain, Max,Mean, ');
            break;

        case '0001111':
            console.log('Rain, Max,Mean, Min, ');
            break;

        case '0010000':
            console.log('Sun, ');
            break;

        case '0010001':
            console.log('Sun, Min, ');
            break;

        case '0010010':
            console.log('Sun, Mean, ');
            break;

        case '0010011':
            console.log('Sun, Mean, Min, ');
            break;

        case '0010100':
            console.log('Sun, Max,');
            break;

        case '0010101':
            console.log('Sun, Max,Min, ');
            break;

        case '0010110':
            console.log('Sun, Max,Mean, ');
            break;

        case '0010111':
            console.log('Sun, Max,Mean, Min, ');
            break;

        case '0011000':
            console.log('Sun, Rain, ');
            break;

        case '0011001':
            console.log('Sun, Rain, Min, ');
            break;

        case '0011010':
            console.log('Sun, Rain, Mean, ');
            break;

        case '0011011':
            console.log('Sun, Rain, Mean, Min, ');
            break;

        case '0011100':
            console.log('Sun, Rain, Max,');
            break;

        case '0011101':
            console.log('Sun, Rain, Max,Min, ');
            break;

        case '0011110':
            console.log('Sun, Rain, Max,Mean, ');
            break;

        case '0011111':
            console.log('Sun, Rain, Max,Mean, Min, ');
            break;

        case '0100000':
            console.log('Exercise, ');
            break;

        case '0100001':
            console.log('Exercise, Min, ');
            break;

        case '0100010':
            console.log('Exercise, Mean, ');
            break;

        case '0100011':
            console.log('Exercise, Mean, Min, ');
            break;

        case '0100100':
            console.log('Exercise, Max,');
            break;

        case '0100101':
            console.log('Exercise, Max,Min, ');
            break;

        case '0100110':
            console.log('Exercise, Max,Mean, ');
            break;

        case '0100111':
            console.log('Exercise, Max,Mean, Min, ');
            break;

        case '0101000':
            console.log('Exercise, Rain, ');
            break;

        case '0101001':
            console.log('Exercise, Rain, Min, ');
            break;

        case '0101010':
            console.log('Exercise, Rain, Mean, ');
            break;

        case '0101011':
            console.log('Exercise, Rain, Mean, Min, ');
            break;

        case '0101100':
            console.log('Exercise, Rain, Max,');
            break;

        case '0101101':
            console.log('Exercise, Rain, Max,Min, ');
            break;

        case '0101110':
            console.log('Exercise, Rain, Max,Mean, ');
            break;

        case '0101111':
            console.log('Exercise, Rain, Max,Mean, Min, ');
            break;

        case '0110000':
            console.log('Exercise, Sun, ');
            break;

        case '0110001':
            console.log('Exercise, Sun, Min, ');
            break;

        case '0110010':
            console.log('Exercise, Sun, Mean, ');
            break;

        case '0110011':
            console.log('Exercise, Sun, Mean, Min, ');
            break;

        case '0110100':
            console.log('Exercise, Sun, Max,');
            break;

        case '0110101':
            console.log('Exercise, Sun, Max,Min, ');
            break;

        case '0110110':
            console.log('Exercise, Sun, Max,Mean, ');
            break;

        case '0110111':
            console.log('Exercise, Sun, Max,Mean, Min, ');
            break;

        case '0111000':
            console.log('Exercise, Sun, Rain, ');
            break;

        case '0111001':
            console.log('Exercise, Sun, Rain, Min, ');
            break;

        case '0111010':
            console.log('Exercise, Sun, Rain, Mean, ');
            break;

        case '0111011':
            console.log('Exercise, Sun, Rain, Mean, Min, ');
            break;

        case '0111100':
            console.log('Exercise, Sun, Rain, Max,');
            break;

        case '0111101':
            console.log('Exercise, Sun, Rain, Max,Min, ');
            break;

        case '0111110':
            console.log('Exercise, Sun, Rain, Max,Mean, ');
            break;

        case '0111111':
            console.log('Exercise, Sun, Rain, Max,Mean, Min, ');
            break;

        case '1000000':
            console.log('Depression, ');
            break;

        case '1000001':
            console.log('Depression, Min, ');
            break;

        case '1000010':
            console.log('Depression, Mean, ');
            break;

        case '1000011':
            console.log('Depression, Mean, Min, ');
            break;

        case '1000100':
            console.log('Depression, Max,');
            break;

        case '1000101':
            console.log('Depression, Max,Min, ');
            break;

        case '1000110':
            console.log('Depression, Max,Mean, ');
            break;

        case '1000111':
            console.log('Depression, Max,Mean, Min, ');
            break;

        case '1001000':
            console.log('Depression, Rain, ');
            break;

        case '1001001':
            console.log('Depression, Rain, Min, ');
            break;

        case '1001010':
            console.log('Depression, Rain, Mean, ');
            break;

        case '1001011':
            console.log('Depression, Rain, Mean, Min, ');
            break;

        case '1001100':
            console.log('Depression, Rain, Max,');
            break;

        case '1001101':
            console.log('Depression, Rain, Max,Min, ');
            break;

        case '1001110':
            console.log('Depression, Rain, Max,Mean, ');
            break;

        case '1001111':
            console.log('Depression, Rain, Max,Mean, Min, ');
            break;

        case '1010000':
            console.log('Depression, Sun, ');
            break;

        case '1010001':
            console.log('Depression, Sun, Min, ');
            break;

        case '1010010':
            console.log('Depression, Sun, Mean, ');
            break;

        case '1010011':
            console.log('Depression, Sun, Mean, Min, ');
            break;

        case '1010100':
            console.log('Depression, Sun, Max,');
            break;

        case '1010101':
            console.log('Depression, Sun, Max,Min, ');
            break;

        case '1010110':
            console.log('Depression, Sun, Max,Mean, ');
            break;

        case '1010111':
            console.log('Depression, Sun, Max,Mean, Min, ');
            break;

        case '1011000':
            console.log('Depression, Sun, Rain, ');
            break;

        case '1011001':
            console.log('Depression, Sun, Rain, Min, ');
            break;

        case '1011010':
            console.log('Depression, Sun, Rain, Mean, ');
            break;

        case '1011011':
            console.log('Depression, Sun, Rain, Mean, Min, ');
            break;

        case '1011100':
            console.log('Depression, Sun, Rain, Max,');
            break;

        case '1011101':
            console.log('Depression, Sun, Rain, Max,Min, ');
            break;

        case '1011110':
            console.log('Depression, Sun, Rain, Max,Mean, ');
            break;

        case '1011111':
            console.log('Depression, Sun, Rain, Max,Mean, Min, ');
            break;

        case '1100000':
            console.log('Depression, Exercise, ');
            break;

        case '1100001':
            console.log('Depression, Exercise, Min, ');
            break;

        case '1100010':
            console.log('Depression, Exercise, Mean, ');
            break;

        case '1100011':
            console.log('Depression, Exercise, Mean, Min, ');
            break;

        case '1100100':
            console.log('Depression, Exercise, Max,');
            break;

        case '1100101':
            console.log('Depression, Exercise, Max,Min, ');
            break;

        case '1100110':
            console.log('Depression, Exercise, Max,Mean, ');
            break;

        case '1100111':
            console.log('Depression, Exercise, Max,Mean, Min, ');
            break;

        case '1101000':
            console.log('Depression, Exercise, Rain, ');
            break;

        case '1101001':
            console.log('Depression, Exercise, Rain, Min, ');
            break;

        case '1101010':
            console.log('Depression, Exercise, Rain, Mean, ');
            break;

        case '1101011':
            console.log('Depression, Exercise, Rain, Mean, Min, ');
            break;

        case '1101100':
            console.log('Depression, Exercise, Rain, Max,');
            break;

        case '1101101':
            console.log('Depression, Exercise, Rain, Max,Min, ');
            break;

        case '1101110':
            console.log('Depression, Exercise, Rain, Max,Mean, ');
            break;

        case '1101111':
            console.log('Depression, Exercise, Rain, Max,Mean, Min, ');
            break;

        case '1110000':
            console.log('Depression, Exercise, Sun, ');
            break;

        case '1110001':
            console.log('Depression, Exercise, Sun, Min, ');
            break;

        case '1110010':
            console.log('Depression, Exercise, Sun, Mean, ');
            break;

        case '1110011':
            console.log('Depression, Exercise, Sun, Mean, Min, ');
            break;

        case '1110100':
            console.log('Depression, Exercise, Sun, Max,');
            break;

        case '1110101':
            console.log('Depression, Exercise, Sun, Max,Min, ');
            break;

        case '1110110':
            console.log('Depression, Exercise, Sun, Max,Mean, ');
            break;

        case '1110111':
            console.log('Depression, Exercise, Sun, Max,Mean, Min, ');
            break;

        case '1111000':
            console.log('Depression, Exercise, Sun, Rain, ');
            break;

        case '1111001':
            console.log('Depression, Exercise, Sun, Rain, Min, ');
            break;

        case '1111010':
            console.log('Depression, Exercise, Sun, Rain, Mean, ');
            break;

        case '1111011':
            console.log('Depression, Exercise, Sun, Rain, Mean, Min, ');
            break;

        case '1111100':
            console.log('Depression, Exercise, Sun, Rain, Max,');
            break;

        case '1111101':
            console.log('Depression, Exercise, Sun, Rain, Max,Min, ');
            break;

        case '1111110':
            console.log('Depression, Exercise, Sun, Rain, Max,Mean, ');
            break;

        case '1111111':
            console.log('Depression, Exercise, Sun, Rain, Max,Mean, Min, ');
            break;
    }
}

function sunChangeHandler() {
    let getNumber = switchCaseNumberGetter();
    switchCaseHandler(getNumber);
}

function rainChangeHandler() {
    let getNumber = switchCaseNumberGetter();
    switchCaseHandler(getNumber);
}
function maxTempChangeHandler() {
    let getNumber = switchCaseNumberGetter();
    switchCaseHandler(getNumber);
}
function meanTempChangeHandler() {
    let getNumber = switchCaseNumberGetter();
    switchCaseHandler(getNumber);
}


function minTempChangeHandler() {
    let getNumber = switchCaseNumberGetter();
    switchCaseHandler(getNumber);
}