const calculator = document.querySelector(".calculator")
const gramDisplay = calculator.querySelector(".gram_display")
const kyatDisplay = calculator.querySelector(".kyat_display")
const pelDisplay = calculator.querySelector(".pel_display")
const ywayDisplay = calculator.querySelector(".yway_display")
const priceDisplay = calculator.querySelector(".price_display")
const resultDisplay = calculator.querySelector(".result_display")
const keys = calculator.querySelector(".calculator__keys")
const decimalKey = keys.querySelector(".decimal")

const displays = calculator.querySelector(".display-container");
const subDisplays = displays.querySelectorAll(".display-group")
//format number
const numberFormat = new Intl.NumberFormat("en-US")

displays.addEventListener("click", (event) => {
    const clickedElement = event.target
    if (clickedElement === displays) return // if it lands on the gap, return
    const category = clickedElement.dataset.category
    if (category) {
        // for programming logic
        if (calculator.dataset.category === category) {
            calculator.dataset.newState = "false"
        } else {
            calculator.dataset.category = category
            calculator.dataset.newState = "true"
        }


        // for visual effects
        subDisplays.forEach((display) => {
            display.classList.remove("selected")
        })
        if (clickedElement.matches(".display-group")) {
            clickedElement.classList.add("selected")
        } else {
            clickedElement.closest(".display-group").classList.add("selected")
        }

        //change decimal key to "000" and back
        if (category === "price") {
            decimalKeyToZero()
        } else {
            backToDecimal()
        }
    }

})

keys.addEventListener("click", (event) => {

    if (event.target === keys) return

    const key = event.target
    const type = key.dataset.type;
    const category = calculator.dataset.category
    const newState = calculator.dataset.newState
    const keyValue = key.dataset.value



    if (category === "gram") {
        if (type === "number") {
            const gramText = gramDisplay.textContent
            if (keyValue === ".") {
                if (gramText.indexOf(".") != -1) return
                if (gramText === "0") {
                    gramDisplay.textContent = "0."
                    return
                }
            }
            if (gramText === "0" || isNewState()) {
                changeState()
                const gramValue = keyValue
                gramDisplay.textContent = gramValue

                convertToKyat(gramValue)
            } else {
                const gramValue = gramText + keyValue
                gramDisplay.textContent = gramValue
                convertToKyat(gramValue)
            }

        } else if (type === "clear") {
            gramDisplay.textContent = "0"
            convertToKyat(0)
        }

    } else if (category === "price") {
        if (type === "number") {
            const priceText = priceDisplay.dataset.value
            // no decimal in price
            if (keyValue === ".") return
            // change decimal button to triple zero


            if (priceText === "0" || isNewState()) {
                changeState()
                const priceValue = keyValue

                priceDisplay.dataset.value = priceValue
                priceDisplay.textContent = numberFormat.format(priceValue)
            } else {
                const priceValue = priceText + keyValue

                priceDisplay.dataset.value = priceValue
                priceDisplay.textContent = numberFormat.format(priceValue)
            }

        } else if (type === "clear") {
            priceDisplay.dataset.value = "0"
            priceDisplay.textContent = "0"
        }
    } else if (category === "yway") {
        if (type === "number") {
            const ywayText = ywayDisplay.textContent
            if (keyValue === ".") {
                if (ywayText.indexOf(".") != -1) return
                if (ywayText === "0") {
                    ywayDisplay.textContent = "0."
                    return
                }
            }
            if (ywayText === "0" || isNewState()) {
                changeState()
                const ywayValue = keyValue
                ywayDisplay.textContent = ywayValue
            } else {
                const ywayValue = ywayText + keyValue
                ywayDisplay.textContent = ywayValue
            }
        } else if (type === "clear") {
            ywayDisplay.textContent = "0"
        }
        convertToGram()
    } else if (category === "pel") {
        if (type === "number") {
            const pelText = pelDisplay.textContent
            if (keyValue === ".") return

            if (pelText === "0" || isNewState()) {
                changeState()
                const pelValue = keyValue
                pelDisplay.textContent = pelValue
            } else {
                const pelValue = pelText + keyValue
                pelDisplay.textContent = pelValue
            }
        } else if (type === "clear") {
            pelDisplay.textContent = "0"
        }
        convertToGram()
    } else if (category === "kyat") {
        if (type === "number") {
            const kyatText = kyatDisplay.textContent
            if (keyValue === ".") return

            if (kyatText === "0" || isNewState()) {
                changeState()
                const kyatValue = keyValue
                kyatDisplay.textContent = kyatValue
            } else {
                const kyatValue = kyatText + keyValue
                kyatDisplay.textContent = kyatValue
            }
        } else if (type === "clear") {
            kyatDisplay.textContent = "0"
        }
        convertToGram()
    }
    calculateAndUpdate()


})


function convertToKyat(gram) {
    const c = 16.606
    const kyatWeight = gram / c
    const kyat = Math.floor(kyatWeight)
    const pel = Math.floor((kyatWeight - kyat) * 16)
    const yway = Math.round(((kyatWeight * 128) % 8) * 100) / 100
    // post to display
    kyatDisplay.textContent = kyat
    pelDisplay.textContent = pel
    ywayDisplay.textContent = yway
}

function convertToGram() {
    const kyat = parseInt(kyatDisplay.textContent),
        pel = parseInt(pelDisplay.textContent),
        yway = parseFloat(ywayDisplay.textContent);
    const gramValue = (kyat + (pel / 16) + (yway / 128)) * 16.606
    gramDisplay.textContent = gramValue.toFixed(3)

}


function calculateAndUpdate() {
    const price = parseInt(priceDisplay.dataset.value),
        kyat = parseInt(kyatDisplay.textContent),
        pel = parseInt(pelDisplay.textContent),
        yway = parseFloat(ywayDisplay.textContent);
    const result = (kyat + (pel / 16) + (yway / 128)) * price
    const roundedResult = Math.round(result / 100) * 100
    resultDisplay.textContent = numberFormat.format(roundedResult)
}

function isNewState() {
    return calculator.dataset.newState === "true"
}

function changeState() {
    calculator.dataset.newState = "false"
}

function decimalKeyToZero() {
    decimalKey.dataset.value = "000"
    decimalKey.textContent = "000"
}

function backToDecimal() {
    decimalKey.textContent = "."
    decimalKey.dataset.value = "."
}