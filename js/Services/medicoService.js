import RestService from './restHttpMethodService';
import {usuarioPath, medicoPath, pesquisaMedicoPath} from './webPathService';

const MedicoSevice = {
    salvar: salvar,
    get: get,
    atualizar: atualizar,
    pesquisar: pesquisar,
    validarCrm: validarCrm,
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
    return RestService.get(`${pesquisaMedicoPath}${parametro}`);
}

function validarCrm(uf,crm) {
    return RestService.getXml(`https://www.consultacrm.com.br/api/index.php?tipo=crm&uf=${uf}&q=${crm}&chave=lulucrate455566`)
    // return RestService.getXml(`https://www.consultacrm.com.br/api/index.php?tipo=crm&uf=SC&q=666&chave=lulucrate455566`)
}
export default MedicoSevice;
