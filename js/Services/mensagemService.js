import RestService from "./restService";

const URI_REST_MESSAGGE = RestService.webService + '/mensagens';

const listMessaggesService = {
    getMensagens: mensagens,
    getMensagensAtendimento: mensagensAtendimento,
    respostaMessagge: respostaMensagem
};

function mensagens(user) {
    return RestService.get(URI_REST_MESSAGGE + "/" + user);
}

function mensagensAtendimento(user, idAtendimento) {
    return RestService.get(URI_REST_MESSAGGE + "/" + user + "?idAtendimento=" + idAtendimento);
}

function respostaMensagem(body) {
    return RestService.post(URI_REST_MESSAGGE, body)
}

export default listMessaggesService;