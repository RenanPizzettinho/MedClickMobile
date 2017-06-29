import RestService from "./restService";

const URI_REST_SOLICITACAO = RestService.webService + '/atendimentos';

const SolicitacaoService = {
    getAtendimentos: getAtendimentos,
    cadastrarSolicitacao: cadastrarSolicitacao,
    cancelarSolicitacao: cancelarSolicitacao,
    confirmarSolicitacao: confirmarSolicitacao
};

function getAtendimentos(user) {
    return RestService.get(URI_REST_SOLICITACAO + "/" + user);
}

function cadastrarSolicitacao(body) {
    return RestService.post(URI_REST_SOLICITACAO, body);
}

function cancelarSolicitacao(id, body) {
    return RestService.put(URI_REST_SOLICITACAO + "/" + id, body);
}

function confirmarSolicitacao(id, body) {
    return RestService.put(URI_REST_SOLICITACAO + "/" + id, body);
}

export default SolicitacaoService;
