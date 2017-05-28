import RestService from './restService';

const URI_REST_USUARIO = RestService.webService + '/api/usuarios';

const UsuarioService = {
    cadastrarUsuario: cadastrarUsuario
};

function cadastrarUsuario(body) {
    return RestService.post(URI_REST_USUARIO,body);
}

export default UsuarioService;