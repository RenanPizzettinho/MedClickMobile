'use strict';
import RestService from "./restService";

const URI_ATENDIMENTO_PACIENTE = RestService.webService + '/atendimentos/';

const AtendimentoPaciente = {
    getAtendimentosFilter: atendimentoPacienteFilter
};

function atendimentoPacienteFilter(user, filter) {
    return RestService.get(URI_ATENDIMENTO_PACIENTE + user + '/' + filter);
}

export default AtendimentoPaciente;
