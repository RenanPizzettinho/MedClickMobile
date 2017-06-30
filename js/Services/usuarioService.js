import RestService from './restService';

const URI_REST_USUARIO = `${RestService.webService}/usuarios`;
const URI_REST_RECUPERAR_SENHA = `${RestService.webService}/reset-password`;

const UsuarioService = {
    getUsuario: getUsuario,
    cadastrarUsuario: cadastrarUsuario,
    recuperarSenha: recuperarSenha,
    salvarInformacoesPessoais: salvarInformacoesPessoais,
    salvarMedico: salvarMedico,
    atualizarMedico: atualizarMedico,
    salvarPaciente: salvarPaciente,
    atualizarPaciente: atualizarPaciente,
    pesquisarMedicos: pesquisarMedicos,
    getMedico: getMedico,
    getPaciente: getPaciente
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
    return RestService.put(`${URI_REST_USUARIO}/${user}`, body);
}

function salvarMedico(user, body) {
    return RestService.post(`${URI_REST_USUARIO}/${user}/perfil-medico`, body);
}

function atualizarMedico(user, body) {
    return RestService.put(`${URI_REST_USUARIO}/${user}/perfil-medico`, body);
}

function salvarPaciente(user, body) {
    return RestService.post(`${URI_REST_USUARIO}/${user}/perfil-paciente`, body);
}

function atualizarPaciente(user, body) {
    return RestService.put(`${URI_REST_USUARIO}/${user}/perfil-paciente`, body);
}

function getMedico(user){
    return RestService.get(`${URI_REST_USUARIO}/${user}/perfil-medico`);
}

function getPaciente(user){
    return RestService.get(`${URI_REST_USUARIO}/${user}/perfil-paciente`);
}

function pesquisarMedicos(parametro) {
    return RestService.get(`${RestService.webService}/medicos?q=${parametro}`);
}
export default UsuarioService;