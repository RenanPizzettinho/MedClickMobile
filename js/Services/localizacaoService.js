import RestService from './restHttpMethodService';
import {geoCode} from './webPathService';

const API_KEY = 'AIzaSyB89KdZuSBF6DQ0W_FEbEWgO-3igRkNIkQ';

const LocalizacaoService = {
    getEndereco: getEndereco,
    formatarEndereco: formatarEndereco
};

function getEndereco(latitude, longitude) {
    return RestService.get(`${geoCode}json?latlng=${latitude},${longitude}&key=${API_KEY}`);
}

function formatarEndereco(endereco) {
    return `${endereco.rua}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado} - ${endereco.pais} - ${endereco.cep}`;
}

export default LocalizacaoService;