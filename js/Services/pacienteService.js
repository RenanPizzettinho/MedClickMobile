import RestService from './restHttpMethodService';
import {azumio, perfilPaciente, usuarioPath, pacientePath} from './webPathService';

const PacienteService = {
    get: get,
    salvar: salvar,
    atualizar: atualizar,
    atualizarAzumio: atualizarAzumio,
    byId: byId,
};

function salvar(user, body) {
    return RestService.post(`${usuarioPath}/${user}/${perfilPaciente}`, body);
}

function atualizar(user, body) {
    return RestService.put(`${usuarioPath}/${user}/${perfilPaciente}`, body);
}

function get(user) {
    return RestService.get(`${usuarioPath}/${user}/${perfilPaciente}`);
}

function atualizarAzumio(idPaciente) {
    return RestService.get(`${azumio}/${idPaciente}/atualizar`);
}

function byId(id) {
    return RestService.get(`${pacientePath}/${id}`)
}

export default PacienteService;