import axios from 'axios';

axios.defaults.baseURL = process.env.NODE_ENV === 'production'
    ? 'http://101.132.35.81:3141'
    : 'http://localhost:3141';

export const getServerResponseUsingAsync = async () => {
    const {data} = await axios.post('/test', {
        test: 'World!',
    });
    return data;
};

export const getServerResponseUsingPromise = () => {
    return axios.post('/test', {
        test: 'World!',
    });
};
