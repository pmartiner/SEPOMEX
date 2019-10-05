const axios = require('axios');

const cp_url = 'http://localhost:3001/cp';

module.exports = {
    getInfoCP: function(data){
        const url = cp_url + '/getInfoCP';
        const encodedURI = window.encodeURI(url);

        return axios.post(encodedURI, {
            d_codigo: data.d_codigo,
            d_estado: data.d_estado,
            d_mnpio: data.d_mnpio,
            d_asenta: data.d_asenta
        })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    getEstados: function() {
        const url = cp_url + '/getEstados';
        const encodedURI = window.encodeURI(url);

        return axios.get(encodedURI)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    getMunicipios: function(d_estado) {
        const url = cp_url + '/getMunicipios?d_estado=' + d_estado;
        const encodedURI = window.encodeURI(url);

        return axios.get(encodedURI)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    getColonias: function(d_estado, d_mnpio) {
        const url = cp_url + '/getColonias?d_estado=' + d_estado + '&d_mnpio=' + d_mnpio;
        const encodedURI = window.encodeURI(url);

        return axios.get(encodedURI)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}