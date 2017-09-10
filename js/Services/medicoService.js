import RestService from './restHttpMethodService';
import {usuarioPath, perfilMedico, pesquisaMedicoPath, medicoPath} from './webPathService';

const MedicoSevice = {
    salvar: salvar,
    get: get,
    atualizar: atualizar,
    pesquisar: pesquisar,
    validarCrm: validarCrm,
    byId: byId,
};

function salvar(user, body) {
    return RestService.post(`${usuarioPath}/${user}/${perfilMedico}`, body);
}

function get(user, header) {
    return RestService.get(`${usuarioPath}/${user}/${perfilMedico}`, header);
}

function atualizar(user, body) {
    return RestService.put(`${usuarioPath}/${user}/${perfilMedico}`, body);
}

function pesquisar(parametro) {
    return RestService.get(`${pesquisaMedicoPath}${parametro}`);
}

function validarCrm(uf, crm) {
    return RestService.getXml(`https://www.consultacrm.com.br/api/index.php?tipo=crm&uf=${uf}&q=${crm}&chave=lulucrate455566`)
}

function byId(id) {
    return RestService.get(`${medicoPath}/${id}`);
}

export default MedicoSevice;
