// const webService = 'http://192.168.19.2:3000/api/v1/';
const webService = 'http://localhost:3000/api/v1/';//USB
// const webService = 'http://192.168.71.2:3000/api/v1/';//REDE


export const loginPath = `${webService}login`;
export const usuarioPath = `${webService}usuarios`;
export const medicoPath = 'perfil-medico';
export const pesquisaMedicoPath = `${webService}medicos?q=`;
export const pacientePath = 'perfil-paciente';
export const atendimentoPath = `${webService}atendimentos`;
export const mensagemPath = 'mensagens';
export const resetPassword = `${webService}reset-password`;
