import RestService from "./restService";

const URI_REST_MESSAGGE = RestService.webService + '/mensagens?user=';

const listMessaggesService = {
    mensagens: mensagens
};

function mensagens(user) {
    return RestService.get(URI_REST_MESSAGGE + user);
}

export default listMessaggesService;