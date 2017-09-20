const StatusSolicitacaoEnum = {
    EM_ABERTO: {KEY: 'EM_ABERTO', DESC: 'Em aberto'},
    CANCELADO: {KEY: 'CANCELADO', DESC: 'Cancelada'},
    CONFIRMADO: {KEY: 'CONFIRMADO', DESC: 'Confirmada'},
    ATENDIDO: {KEY: 'ATENDIDO', DESC: 'Encerrado'},
};

StatusSolicitacaoEnum.toDesc = (key) => {
    switch (key) {
        case StatusSolicitacaoEnum.EM_ABERTO.KEY:
            return StatusSolicitacaoEnum.EM_ABERTO.DESC;
        case StatusSolicitacaoEnum.CANCELADO.KEY:
            return StatusSolicitacaoEnum.CANCELADO.DESC;
        case StatusSolicitacaoEnum.CONFIRMADO.KEY:
            return StatusSolicitacaoEnum.CONFIRMADO.DESC;
        case StatusSolicitacaoEnum.ATENDIDO.KEY:
            return StatusSolicitacaoEnum.ATENDIDO.DESC
    }
};

module.exports = StatusSolicitacaoEnum;