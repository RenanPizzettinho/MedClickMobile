import RestService from './restHttpMethodService';
import {atendimentoPath} from './webPathService';

const SolicitacaoService = {
    get: get,
    cadastrar: cadastrar,
    cancelar: cancelar,
    confirmar: confirmar
};

function get(user) {
    return RestService.get(`${atendimentoPath}/${user}`);
}

function cadastrar(body) {
    return RestService.post(atendimentoPath, body);
}

function cancelar(id, body) {
    return RestService.put(`${atendimentoPath}/${id}`, body);
}

function confirmar(id, body) {
    return RestService.put(`${atendimentoPath}/${id}`, body);
}

export default SolicitacaoService;
