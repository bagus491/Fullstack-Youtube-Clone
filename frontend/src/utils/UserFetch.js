//register

export const doRegister = async (username,password,email) => {
    try{
        const formData = new URLSearchParams()
            formData.append('username',username)
            formData.append('password',password)
            formData.append('email',email)
        const respone = await fetch('http://localhost:5000/register',{
            method:'post',
            body: formData,
        })

        return respone
    }catch(error){
        console.error({msg : 'Internal Error'})
    }
}


//login 
export const doLogin = async (username,password) => {
    try{
        const formData = new URLSearchParams()
            formData.append('username',username)
            formData.append('password',password)
        const respone = await fetch('http://localhost:5000/login',{
            method:'post',
            body: formData,
            credentials: 'include'
        })

        return respone
    }catch(error){
        console.error({msg : 'Internal Error'})
    }
}


//CheckLogin
export const CheckLogin = async () => {
    try{
        const respone = await fetch('http://localhost:5000/login',{
            method: 'GET',
            credentials: 'include'
        })
        return respone
    }catch(error){
        console.error(error)
    }
}


//dasbord check

//CheckLogin
export const CheckDasbord = async () => {
    try{
        const respone = await fetch('http://localhost:5000/dasbord/auth',{
            method: 'GET',
            credentials: 'include'
        })
        return respone
    }catch(error){
        console.error(error)
    }
}



//doLogout 
export const doLogout = async () => {
    try{
        const respone = await fetch('http://localhost:5000/logout',{
            method:'GET',
            credentials: 'include'
        })
        return respone
    }catch(error){
        console.error(error)
    }
}
