import React from 'react';


const RestService = {
    webService: 'http://192.168.19.2:3000/api/v1',
    get: get,
    post: post,
    patch: patch
};

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

function get(uri) {
    return fetch(uri);
}

function post(uri,body){
    return fetch(uri,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });
}
function patch(uri,body){
    return fetch(uri,{
        method: 'PATCH',
        headers: headers,
        body: JSON.stringify(body)
    });
}

export default RestService;