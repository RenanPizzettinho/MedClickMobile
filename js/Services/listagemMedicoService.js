import RestService from "./restService";

const URI_REST_LOGIN = RestService.webService + '/medicos?q=';

const ListMedicosService = {
    medicos: medicos
};

function medicos(filter) {
    return RestService.get(URI_REST_LOGIN + filter);
}

export default ListMedicosService;