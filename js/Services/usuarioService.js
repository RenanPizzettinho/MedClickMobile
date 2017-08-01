import RestService from './restHttpMethodService';
import {usuarioPath, resetPassword} from './webPathService';

const UsuarioService = {
    get: get,
    cadastrar: cadastrar,
    recuperarSenha: recuperarSenha,
    salvarInformacoesPessoais: salvarInformacoesPessoais,
};

function get(id) {
    return RestService.get(`${usuarioPath}/${id}`);
}

function cadastrar(body) {
    return RestService.post(`${usuarioPath}/`, body);
}

function salvarInformacoesPessoais(user, body) {
    return RestService.put(`${usuarioPath}/${user}`, body);
}

function recuperarSenha(body) {
    return RestService.post(resetPassword, body);
}

export default UsuarioService;