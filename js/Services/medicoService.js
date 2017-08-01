import RestService from './restHttpMethodService';
import {usuarioPath, medicoPath} from './webPathService';

const MedicoSevice = {
    salvar: salvar,
    get: get,
    atualizar: atualizar,
    pesquisar: pesquisar,
};

function salvar(user, body) {
    return RestService.post(`${usuarioPath}/${user}/${medicoPath}`, body);
}

function get(user) {
    return RestService.get(`${usuarioPath}/${user}/${medicoPath}`);
}

function atualizar(user, body) {
    return RestService.put(`${usuarioPath}/${user}/${medicoPath}`, body);
}

function pesquisar(parametro) {
    return RestService.get(`${usuarioPath}/${medicoPath}?q=${parametro}`);
}
export default MedicoSevice;
