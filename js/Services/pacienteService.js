import RestService from './restHttpMethodService';
import {usuarioPath, pacientePath} from './webPathService';

const PacienteService = {
    get: get,
    salvar: salvar,
    atualizar: atualizar,
};

function salvar(user, body) {
    return RestService.post(`${usuarioPath}/${user}/${pacientePath}`, body);
}

function atualizar(user, body) {
    return RestService.put(`${usuarioPath}/${user}/${pacientePath}`, body);
}

function get(user) {
    return RestService.get(`${usuarioPath}/${user}/${pacientePath}`);
}

export default PacienteService;