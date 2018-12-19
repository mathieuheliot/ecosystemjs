

import _ from "lodash/object"

import Configuration from "./Configuration"

class Environment {

    constructor(callback) {

        if (typeof window == undefined) {
            throw new Error('Le contexte d\'exécution de l\'application ne permet l\'utilisation d\'Environnement (objet "window" nécessaire)') // 💩
        }

        window.onload = () => {

            Configuration.load()
                .then(configuration => {

                    this.config = configuration
                    window.__CONFIG__ = configuration
                    
                    console.log('🌵 Environnement chargé')
                    callback(this)
                })
                .catch(error => {
                    console.error(error)
                })
        }
    }
}

export default Environment