

//GetProfile
export const GetProfile = async(PrName) => {
    try{
        const respone = await fetch(`http://localhost:5000/profile/${PrName}`,{
            method: 'GET',
            credentials: 'include'
        })
        return respone
    }catch(error){
        console.error(error)
    }
}

//checkProfile
export const CheckProfile = async() => {
    try{
        const respone = await fetch(`http://localhost:5000/dasbord/checkProfile`,{
            method: 'GET',
            credentials: 'include'
        })
        return respone
    }catch(error){
        console.error(error)
    }
}

//PostProfile
export const AddProfile = async (PrName,Desc,Profile) =>{
    try{
        const formData = new FormData()
                formData.append('PrName',PrName)
                formData.append('Desc',Desc)
                formData.append('Profile',Profile[0])
        const respone = await fetch('http://localhost:5000/dasbord/profile',{
            method: 'post',
            body: formData,
            credentials: 'include'
        })
        return respone
    }catch(error){
        console.error(error)
    }
}

//doUpdate
export const doUpdateProfile = async(PrName,Desc) => {
    try{
        const formData = await URLSearchParams()
                formData.append('PrName',PrName)
                formData.append('Desc',Desc)
        const respone = await fetch('http://localhost:5000/dasbord/profile',{
            method: 'PUT',
            body: formData,
            credentials: 'include'
        })
        return respone
    }catch(error){
        console.error(error)
    }
}

//do delete
export const doDeleteProfile = async() => {
    try{
        const respone = await fetch('http://localhost:5000/dasbord/profile',{
            method :'delete',
            credentials: 'include'
        })
        return respone
    }catch(error){
        console.error(error)
    }
}


//checksub
export const CheckSub = async(PrName) => {
    try{
        const respone = await fetch(`http://localhost:5000/checksub/${PrName}`,{
            method :'GET',
            credentials:'include'
        })
        return respone
    }catch(error){
        console.error(error)
    }
}

//checksub
export const doSub = async(PrName) => {
    try{
        const respone = await fetch(`http://localhost:5000/sub/${PrName}`,{
            method :'GET',
            credentials:'include'
        })
        return respone
    }catch(error){
        console.error(error)
    }
}

//checksub
export const doUnSub = async(PrName) => {
    try{
        const respone = await fetch(`http://localhost:5000/unsub/${PrName}`,{
            method :'GET',
            credentials:'include'
        })
        return respone
    }catch(error){
        console.error(error)
    }
}