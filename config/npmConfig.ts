type possible_keys = "base_url" | "BASE_URL" | "swagger_url"


export const CONFIG = {
    get(configKey: possible_keys, defaultValue: string = ""){
        const value = process.env[`npm_config_${configKey}`]
        if (value == null){
            return defaultValue
            // throw new Error(`
            // Configuration error: npm_config_${configKey} is missing.
            // Make sure that it's defined in .npmrc file as cli flag
            // `)
        }
        return value
    }
}