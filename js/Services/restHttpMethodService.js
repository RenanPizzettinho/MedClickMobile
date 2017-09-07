import React from "react";

const RestService = {
    get: get,
    post: post,
    patch: patch,
    put: put,
    getXml: getXml
};

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

function get(uri, header) {
    return fetch(uri, {
        method: 'GET',
        headers: header || headers,
    }).then((response) => response.json());
}

function getXml(uri) {
    return fetch(uri).then(response =>
        response.text()
    );
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