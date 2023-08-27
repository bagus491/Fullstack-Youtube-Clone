
//addvideo
export const addVideo = async (Title,Desc,Videos,Poster) => {
    try{
        const formData = new FormData()
                formData.append('Title',Title)
                formData.append('Desc',Desc)
                formData.append('Videos',Videos[0])
                formData.append('Poster',Poster[0])
        const respone = await fetch('http://localhost:5000/dasbord/upload',{
            method:'post',
            body: formData,
            credentials: 'include'
        })
        return respone
    }catch(error){
        console.error(error)
    }
}


//getVideo
export const getVideos = async () => {
    try{
        const respone = await fetch('http://localhost:5000/videos',{
            method:'GET'
        })
        return respone
    }catch(error){
        console.error(error)
    }
}

//getVideoUpload
export const getVideoUpload = async(PrName) => {
    try{
        const respone = await fetch(`http://localhost:5000/dasbord/videos/${PrName}`,{
            method: 'GET',
            credentials: 'include'
        })
        return respone
    }catch(error){
        console.error(error)
    }
}

//watch
export const watchVideo = async(PrName,id) => {
    try{
        const respone = await fetch(`http://localhost:5000/watch/${PrName}/${id}`,{
            method:'GET',
            credentials: 'include'
        })
        return respone
    }catch(error){
        console.error(error)
    }
}


//doDelete
export const doDeleteVideo = async(id) =>{
    try{
        const respone = await fetch(`http://localhost:5000/${id}`,{
            method: 'delete',
            credentials: 'include'
        })
        return respone
    }catch(error){
        console.error(error)
    }
}