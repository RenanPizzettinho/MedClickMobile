import React from 'react';


const RestService = {
    webService: 'http://localhost:3000',
    get: get,
    post: post,
    patch: patch
};

function get(uri) {
    return fetch(uri);
}

function post(uri,body){
    return fetch(uri,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });
}
function patch(uri,body){
    return fetch(uri,{
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: body
    });
}

export default RestService;