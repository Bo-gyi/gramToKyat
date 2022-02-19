const calculator = document.querySelector(".calculator")
const gramDisplay = calculator.querySelector(".gram_display")
const kyatDisplay = calculator.querySelector(".kyat_display")
const pelDisplay = calculator.querySelector(".pel_display")
const ywayDisplay = calculator.querySelector(".yway_display")
const priceDisplay = calculator.querySelector(".price_display")
const resultDisplay = calculator.querySelector(".result_display")
const keys = calculator.querySelector(".calculator__keys")
const fieldSet = calculator.querySelector(".category")
const catKeys = fieldSet.querySelectorAll(".category__key")

//format number
const numberFormat = new Intl.NumberFormat("en-US")

keys.addEventListener("click", (event) => {

    if (event.target === keys) return

    const key = event.target
    const type = key.dataset.type;
    const category = calculator.dataset.category
    const keyValue = key.dataset.value

    // change category according to selected keys
    if (type === "category") {
        //to make sure each category is pressed for only one time
        catKeys.forEach((key) => {
            key.disabled = false
            key.classList.remove("selected")
        })
        key.disabled = true
        key.classList.add("selected")


        const currentCategory = keyValue;
        calculator.dataset.category = currentCategory
    }

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
            if (gramText === "0") {
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
            const priceText = priceDisplay.textContent
            // no decimal price
            if (keyValue === ".") return

            if (priceText === "0") {
                const priceValue = keyValue
                priceDisplay.textContent = priceValue
            } else {
                const priceValue = priceText + keyValue
                // priceDisplay.textContent = numberFormat.format(priceValue)
                priceDisplay.textContent = priceValue
            }
        } else if (type === "clear") {
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
            if (ywayText === "0") {
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

            if (pelText === "0") {
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

            if (kyatText === "0") {
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
    const price = parseInt(priceDisplay.textContent),
        kyat = parseInt(kyatDisplay.textContent),
        pel = parseInt(pelDisplay.textContent),
        yway = parseFloat(ywayDisplay.textContent);
    const result = (kyat + (pel / 16) + (yway / 128)) * price
    const roundedResult = Math.round(result / 100) * 100
    resultDisplay.textContent = numberFormat.format(roundedResult)
}