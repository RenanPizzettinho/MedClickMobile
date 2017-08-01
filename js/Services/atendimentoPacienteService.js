import RestService from "./restHttpMethodService";
import {atendimentoPath} from './webPathService';

const AtendimentoPaciente = {
    getAtendimentosFilter: atendimentoPacienteFilter
};

function atendimentoPacienteFilter(user, filter) {
    return RestService.get(`${atendimentoPath}/${user}/${filter}`);
}

export default AtendimentoPaciente;
