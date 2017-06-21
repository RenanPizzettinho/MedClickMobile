import RestService from './restService';

const URI_REST_USUARIO = `${RestService.webService}/usuarios`;
const URI_REST_RECUPERAR_SENHA = `${RestService.webService}/reset-password`;

const UsuarioService = {
    getUsuario: getUsuario,
    cadastrarUsuario: cadastrarUsuario,
    recuperarSenha: recuperarSenha,
    salvarInformacoesPessoais: salvarInformacoesPessoais,
    salvarMedico: salvarMedico,
    salvarPaciente: salvarPaciente
};

function getUsuario(id) {
    return RestService.get(`${URI_REST_USUARIO}/${id}`);
}

function cadastrarUsuario(body) {
    return RestService.post(URI_REST_USUARIO, body);
}

function recuperarSenha(body) {
    return RestService.post(URI_REST_RECUPERAR_SENHA, body);
}

function salvarInformacoesPessoais(user, body) {
    return RestService.post(`${URI_REST_USUARIO}/${user}/perfil-pessoa`, body);
}

function salvarMedico(user, body) {
    return RestService.post(`${URI_REST_USUARIO}/${user}/perfil-medico`, body);
}

function salvarPaciente(user, body) {
    return RestService.post(`${URI_REST_USUARIO}/${user}/perfil-paciente`, body);
}

export default UsuarioService;