import React from "react";

const RestService = {
    webService: 'http://192.168.19.2:3000/api/v1',
    get: get,
    post: post,
    patch: patch,
    put: put
};

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

function get(uri) {
    return fetch(uri).then((response) => response.json());
}

function post(uri, body) {
    return fetch(uri, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
    }).then((response) => response.json());
}

function put(uri, body) {
    return fetch(uri, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body)
    }).then((response) => response.json());
}

function patch(uri, body) {
    return fetch(uri, {
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body)
    }).then((response) => response.json());
}

export default RestService;