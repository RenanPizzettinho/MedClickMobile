import RestService from './restHttpMethodService';
import {atendimentoPath} from './webPathService';

const SolicitacaoService = {
    get: get,
    cadastrar: cadastrar,
    movimentar: movimentar,
};

function get(user) {
    return RestService.get(`${atendimentoPath}/${user}`);
}

function cadastrar(body) {
    return RestService.post(atendimentoPath, body);
}

function movimentar(id, body) {
    return RestService.put(`${atendimentoPath}/${id}`, body);
}

export default SolicitacaoService;
