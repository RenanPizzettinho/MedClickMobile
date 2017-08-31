const webService = 'http://192.168.99.1:3000/api/v1/';
// const webService = 'http://localhost:3000/api/v1/';//USB
// const webService = 'http://192.168.71.2:3000/api/v1/';//REDE
// const webService = 'http://medclick.herokuapp.com/api/v1/';


export const loginPath = `${webService}login`;
export const usuarioPath = `${webService}usuarios`;
export const medicoPath = 'perfil-medico';
export const pesquisaMedicoPath = `${webService}medicos?q=`;
export const pacientePath = 'perfil-paciente';
export const atendimentoPath = `${webService}atendimentos`;
export const mensagemPath = 'mensagens';
export const resetPassword = `${webService}reset-password`;
export const integracao = `${webService}integracao`;
export const azumio = `${integracao}/azumio/paciente`;