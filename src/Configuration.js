
import _ from 'lodash/lang'
import http from "axios"

/**
 * Manage configuration through two methods:
 *  - loadFromDOM: DOM element such as <script id="config" type="application/json">{"locale":"fr"}</script>,
 *  - loadFromFile: .env.json file available in /public folder.
 * 
 * If one of these two methods hasn't been figured out,
 * the configuration manage will fall into error.
 *  
 * Based on {@link https://codeburst.io/passing-configuration-to-vue-js-1b96fa8f959|Passing configuration to Vue.js}.
 */

class Configuration {

    constructor(properties) {
        this.properties = properties
    }

    static load() {

        return new Promise((resolve, reject) => {

            Configuration.loadFromDOM()
                .then(config => {
                    resolve(config)
                })
                .catch(() => {

                    Configuration.loadFromFile()
                        .then(config => {
                            resolve(config)
                        })
                        .catch(error => {
                            reject('Impossible de trouver de configuration pour l\'environnement') // 💩
                        })
                })
        })
    }

    static loadFromDOM() {

        return new Promise((resolve, reject) => {

            const configElement = document.getElementById('config')
            if (configElement === null) {
                console.info('Aucune balise <script id="config"> trouvée');
                reject(null)
            }

            const properties = JSON.parse(configElement.innerHTML)
            resolve(new Configuration(properties))
        })
    }

    static loadFromFile() {

        return new Promise((resolve, reject) => {

            http.get('env.json')
                .then(response => {
                    const properties = response.data
                    resolve(new Configuration(properties))
                })
                .catch(error => {
                    console.info('Aucun fichier "env.json"')
                    reject(error)
                })
        })
    }

    get(key) {

        const value = this.properties[key]
        if (_.isUndefined(value)) {
            console.error('La propriété "' + key + '" n\'est pas défini en configuration')
        }

        return value
    }
}

export default Configuration