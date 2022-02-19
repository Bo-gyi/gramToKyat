const calculator = document.querySelector(".calculator")
const gramDisplay = calculator.querySelector(".gram_display")
const kyatDisplay = calculator.querySelector(".kyat_display")
const keys = calculator.querySelector(".calculator__keys")
keys.addEventListener("click", () => {
    if (event.target === keys) return

    const key = event.target
    const type = key.dataset.type;
    if (type === "number") {
        const keyValue = key.dataset.value
        const gramText = gramDisplay.textContent
        if (gramText === "0") {
            const gramValue = keyValue
            gramDisplay.textContent = gramValue

            kyatDisplay.textContent = convertToKyat(gramValue)
        } else {
            const gramValue = gramText + keyValue
            gramDisplay.textContent = gramValue
            kyatDisplay.textContent = convertToKyat(gramValue)
        }

    } else if (type === "clear") {
        gramDisplay.textContent = "0"
        kyatDisplay.textContent = "0"
    }

})


function convertToKyat(gram) {
    const c = 16.606
    const kyatWeight = gram / c
    const kyat = Math.floor(kyatWeight)
    const pel = Math.floor((kyatWeight - kyat) * 16)
    const yway = Math.round(((kyatWeight * 128) % 8) * 100) / 100
    const result = kyat + " - " + pel + " - " + yway
    return result
}