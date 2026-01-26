// TODO: Write a function log(message) that prints "LOG:" + message
// TODO: Write a function warn(message) that prints "WARNING:" + message

// TODO: Export log as the main function using module.exports
// TODO: Also attach warn as an additional property of module.exports
function log(message) {
    console.log("LOG:", message)
}

function warn(message) {
    console.log("WARNING:", message)
}
module.exports = log
module.exports.warn = warn // additional export after you have exported a default function