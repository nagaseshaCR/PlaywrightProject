class APIUtils{

    constructor(apiContext,loginPayLoad){
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken(){
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',{data:this.loginPayLoad})        
            const loginResponseJson = await loginResponse.json();
            const token = loginResponseJson.token;
             return token;
    }

    async createOrder(createOrder){

        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',{
        data: createOrder,
        headers:{
            'Authorization': response.token,
            'Content-Type':'application/json'
        }
    })

    const orderResponseJson = await orderResponse.json();
    const orderID = await orderResponseJson.orders[0];
    console.log('order res id: '+orderID)
    response.orderID = orderID;
    return response;
    }
}
module.exports = {APIUtils}