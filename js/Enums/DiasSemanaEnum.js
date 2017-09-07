const DiasSemanaEnum = {
    SEGUNDA: {KEY: 'seg', DESC: 'Segunda'},
    TERCA: {KEY: 'ter', DESC: 'Terça'},
    QUARTA: {KEY: 'qua', DESC: 'Quarta'},
    QUINTA: {KEY: 'qui', DESC: 'Quinta'},
    SEXTA: {KEY: 'sex', DESC: 'Sexta'},
    SABADO: {KEY: 'sab', DESC: 'Sabado'},
    DOMINGO: {KEY: 'dom', DESC: 'Domingo'},
};

DiasSemanaEnum .toDesc = (key) => {
    switch (key) {
        case DiasSemanaEnum .SEGUNDA.KEY:
            return DiasSemanaEnum .SEGUNDA.DESC;
        case DiasSemanaEnum .TERCA.KEY:
            return DiasSemanaEnum .TERCA.DESC;
        case DiasSemanaEnum .QUARTA.KEY:
            return DiasSemanaEnum .QUARTA.DESC;
        case DiasSemanaEnum .QUINTA.KEY:
            return DiasSemanaEnum .QUINTA.DESC;
        case DiasSemanaEnum .SEXTA.KEY:
            return DiasSemanaEnum .SEXTA.DESC;
        case DiasSemanaEnum .SABADO.KEY:
            return DiasSemanaEnum .SABADO.DESC;
        case DiasSemanaEnum .DOMINGO.KEY:
            return DiasSemanaEnum .DOMINGO.DESC;
    }
};

module.exports = DiasSemanaEnum;