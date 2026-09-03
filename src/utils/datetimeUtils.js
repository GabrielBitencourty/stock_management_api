function getCurrentDateTime() {
    return new Date()
}

function getFormatedDateTime() {
    const currentDate = getCurrentDateTime()

    const formattedDate = new Date(currentDate)
        .toLocaleDateString('pt-BR', { timeZone: 'UTC' })
        .replace(/\//g, '-');

    return formattedDate
}

module.exports = {
    getCurrentDateTime,
    getFormatedDateTime
}