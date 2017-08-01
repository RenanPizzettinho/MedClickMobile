import RestService from './restHttpMethodService';
import {loginPath} from './webPathService';

const LoginService = {
    login: login
};

function login(body) {
    return RestService.post(loginPath,body);
}

export default LoginService;