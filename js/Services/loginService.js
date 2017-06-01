import RestService from './restService';

const URI_REST_LOGIN = RestService.webService + '/users/login';

const LoginService = {
    login: login
};

function login(body) {
    return RestService.post(URI_REST_LOGIN,body);
}

export default LoginService;