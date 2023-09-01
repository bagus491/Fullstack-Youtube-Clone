import { useState } from "react"
import { Form,Button } from "react-bootstrap"
import { addVideo } from "../../utils/VideoFetch"
import { useNavigate } from "react-router-dom"



export const UploadCompo = () => {
    const [Title, setTitle] = useState('')
    const [Desc, setDesc] = useState('')
    const [Video, setVideo] = useState()
    const [Poster, setPoster] = useState()
    const Navigate = useNavigate()
    const handleAdd = async(e) => {
        e.preventDefault()
        try{
            const respone = await addVideo(Title,Desc,Video,Poster)
            if(respone.status === 404){
              Navigate('*')
            }

            if(respone.status === 401){
              const json  = await respone.json()
              alert(json.msg)
              return false;
            }

            const json  = await respone.json()
            alert(json.msg)
            Navigate('/dasbord')
        }catch(error){
            console.error(error)
        }
    }
    return(
        <>
        <h1>Upload Video</h1>
        <form onSubmit={handleAdd}>
            <div className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
            required
            type="text"
            placeholder="Title"
            name="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
            </div>
            <div className="mb-3">
            <Form.Label>Desc</Form.Label>
            <Form.Control
          as="textarea"
          placeholder="Desc"
          style={{ height: '100px' }}
          name="Desc"
          onChange={(e) => setDesc(e.target.value)}
        />
            </div>
            <div className="mb-3">
            <Form.Label>Video File</Form.Label>
            <Form.Control
            required
            type="file"
            placeholder="Video File"
            name="Video"
            onChange={(e) => setVideo(e.target.files)}
          />
            </div>
            <div className="mb-3">
            <Form.Label>Poster</Form.Label>
            <Form.Control
            required
            type="file"
            placeholder="Poster"
            name="Poster"
            onChange={(e) => setPoster(e.target.files)}
          />
            </div>
        <Button type="submit">Submit</Button>
        </form>
        </>
    )
}