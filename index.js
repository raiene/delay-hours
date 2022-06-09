require('dotenv').config();

const axios = require('axios');

const urlBase = process.env.URL_BASE;
const axiosInstance = axios.create({baseURL: urlBase});

/**
 * 
 * @returns the cookie get by login the frequency employee site set in dotenv config
 */
async function logIn(){
    var auth = new URLSearchParams();
    auth.append("login", process.env.LOGIN_USER);
    auth.append("senha", process.env.PASSWORD_USER);
    const urlFull = process.env.URL_LOGIN;
    const result = await axiosInstance.post(urlFull, auth);
    return result.headers['set-cookie'];

}

/**
 * 
 * @param {cookie} string - a guarantee of login
 * @returns an object containing the result of data information about frequency employee of current month/year
 */
async function getDataByMonth(cookie){
    axiosInstance.defaults.headers.post['Cookie'] = (cookie);
    var today = new Date(), year = today.getFullYear(), month = today.getMonth();
    const params = {
        "cod_funcionario": "",
        "funcionario": "",
        "cod_cargo": "",
        "cargo": "",
        "cod_depto": "",
        "depto": "",
        "cod_empresa": "",
        "empresa": "",
        "demitido": "false",
        "bloqueado": "false",    
        "cmd": "get_espelho2",
        "de": new Date(year, month, 1).toLocaleDateString("pt-BR"), 
        "ate": new Date(year, month + 1, 0).toLocaleDateString("pt-BR"), 
        "posicao": "0", 
    }
    var paramsUSP = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
        paramsUSP.append(k, v);
    }
    const urlFull = process.env.URL_CONSULT;
    const result = await axiosInstance.post(urlFull, paramsUSP);
    return result;
    
}

/**
 * Main function
 */
async function main() {
    const cookie = await logIn();
    const dataResult = await getDataByMonth(cookie);
    const totalDelay = dataResult.data.split('"t_h_extra-atraso":')[1].split(',')[0];

    console.log(totalDelay);
}

main();
