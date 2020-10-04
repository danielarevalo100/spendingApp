import request from 'axios'


export default {
    users:{
        login: async (password,callback) => {
            try{
                request.defaults.headers.common['authorization'] = localStorage.getItem("token");
                const response = await request.post('http://localhost:8080/api/users/login',{password})
                if(callback){
                    if(response.status===200){
                        
                        callback(response.data.data)
                    }
                }
            }catch(err){
                    callback(null)
            }
        }
    },
    transactions:{
        create: async (email,amount,type,name=null,callback)=>{
            try{
                const data={email,amount,type}
                data.name = type === 'REQUEST'? name: null
                request.defaults.headers.common['authorization'] = localStorage.getItem("token");
                const response= await request.post('https://spending-app-backend.herokuapp.com/api/transactions',{data})
                if(callback){
                    callback(response.data)
                }
            }catch(err){
                console.log(err)
                callback(null)
            }
        },
        get: async (callback)=>{
            try{

                request.defaults.headers.common['authorization'] = localStorage.getItem("token");
                const response = await request.get('http://localhost:8080/api/transactions/')
                if(callback){
                    callback(response.data)
                }else{
                    callback(null)
                }
            }catch(err){console.log(err)}
        }
    }
}