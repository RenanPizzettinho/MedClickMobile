import RestService from './restService';

const URI_REST_USUARIO = `${RestService.webService}/users`;
const URI_REST_RECUPERAR_SENHA = `${RestService.webService}/`

const UsuarioService = {
    cadastrarUsuario: cadastrarUsuario,
    recuperarSenha: recuperarSenha
};

function cadastrarUsuario(body) {
    return RestService.post(URI_REST_USUARIO, body);
}

function recuperarSenha(body) {
    return RestService.post(URI_REST_RECUPERAR_SENHA, body);
}

export default UsuarioService;