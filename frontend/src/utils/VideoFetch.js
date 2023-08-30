
//addvideo
export const addVideo = async (Title,Desc,Video,Poster) => {
    try{
        const formData = new FormData()
                formData.append('Title',Title)
                formData.append('Desc',Desc)
                formData.append('Video',Video[0])
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
export const watchVideo = async(id) => {
    try{
        const respone = await fetch(`http://localhost:5000/watch/${id}`,{
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
        const respone = await fetch(`http://localhost:5000/dasbord/video/${id}`,{
            method: 'delete',
            credentials: 'include'
        })
        return respone
    }catch(error){
        console.error(error)
    }
}