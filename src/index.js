
import _ from 'lodash/lang'
import Configuration from './Configuration'
import Environment from './Environment'

export default key => {

    if (_.isUndefined(window.__CONFIG__)) {
        throw new Error('Aucune configuration n\'a encore été chargé') // 💩
    }

    return window.__CONFIG__.get(key)
}

export {
    Configuration,
    Environment
}