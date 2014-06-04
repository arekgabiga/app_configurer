var configurer = require("../app/configurer");
var template = require("./template.json")

process.env.NODEJS_CONFIG_PATH = "../test/env.json"
var result = configurer.configure(template)

console.log(result.url.testHost)