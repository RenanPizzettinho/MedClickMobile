import RestService from "./restHttpMethodService";
import {mensagemPath} from './webPathService';

const MensagemService = {
    get: get,
    getMensagensAtendimento: getMensagensAtendimento,
    resposta: resposta
};

function get(user) {
    return RestService.get(`${mensagemPath}/${user}`);
}

function getMensagensAtendimento(user, idAtendimento) {
    return RestService.get(`${mensagemPath}/${user}?idAtendimento=${idAtendimento}`);
}

function resposta(body) {
    return RestService.post(`${mensagemPath}/${user}`, body)
}

export default MensagemService;