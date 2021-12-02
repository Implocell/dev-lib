type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';

const request = (path: string, method: Methods, body?: BodyInit) => {
    const token = sessionStorage.getItem('authToken');
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    if (token) {
        headers.append('Authorization', token);
    }

    return fetch(`/api/v1/${path}`, {
        method: method,
        headers,
        body,
    });
};

export default request;
