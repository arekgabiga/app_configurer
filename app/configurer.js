var jsonPath = require('JSONPath')
var flat = require('flat')

function configure(template){
    if(process.env.NODEJS_CONFIG_PATH === undefined){
        throw new Error("Environment variable NODEJS_CONFIG_PATH must be set and point to the environment configuration file")
    }
    var envFile;
    try{
        envFile = require(process.env.NODEJS_CONFIG_PATH)
    }catch(e){
        throw new Error("Environment file '"+ process.env.NODEJS_CONFIG_PATH + "' does not exist. Exception: " + e)
    }
    var templateFlat = flat.flatten(template)
    var environmentFlat = flat.flatten(envFile)
    for(obj in templateFlat){
        while(templateFlat[obj].indexOf("{") > -1){
            if(templateFlat[obj].indexOf("}") > -1){
                var mergeField = templateFlat[obj].substring(templateFlat[obj].indexOf("{")+1,templateFlat[obj].indexOf("}"))
                if(environmentFlat[mergeField]){
                    templateFlat[obj] = templateFlat[obj].replace("{" + mergeField + "}", environmentFlat[mergeField])
                }else if(jsonPath.eval(envFile, mergeField)[0] instanceof Array) {
                    templateFlat[obj] =  jsonPath.eval(envFile, mergeField)[0]
                }else{
                    throw new Error("Environment must contain template field:" + mergeField)
                }
            }else{
                throw new Error("Templates must contain merge fields in format:{fieldToMerge}")
            }
        }
    }

    return flat.unflatten(templateFlat)
}

exports.configure = configure
