// 切換內部與外部API的URL

const localAPI = 'http://localhost'
const lanAPI = 'http://192.168.68.60'
const wanAPI = 'http://weiweihome.tplinkdns.com'



// 帳號API
class APIurl {
    UserServiceurl() {         
        let url = wanAPI + ':8080/api/test/';
        return url;

        // return axios.get(wanAPI + ':8080/api/test/all');
    }

    AuthServiceurl() {        
        let url = wanAPI + ':8080/api/auth/';
        return url;

        // return axios.get(wanAPI + ':8080/api/auth/all');
    }

    ProductServiceurl() {        
        let url = wanAPI + ':8082/api/products/';
        return url;

        // return axios.get(wanAPI + ':8080/api/product/all');
    }

    Imagepath() {         
        let url = wanAPI + ':8082/';
        return url;

        // return axios.get(wanAPI + ':8080/api/product/all');
    }

}

export default new APIurl();


