import RestService from './restHttpMethodService';
import {geoCode} from './webPathService';

const API_KEY = 'AIzaSyB89KdZuSBF6DQ0W_FEbEWgO-3igRkNIkQ';

const LocalizacaoService = {
  getEndereco: getEndereco
};

function getEndereco(latitude,longitude) {
   return RestService.get(`${geoCode}json?latlng=${latitude},${longitude}&key=${API_KEY}`);
}

export default LocalizacaoService;