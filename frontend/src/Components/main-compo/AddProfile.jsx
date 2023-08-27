import { useState } from "react"
import { Button, Card,Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { doLogout } from "../../utils/UserFetch"
import { AddProfile as formProfile } from "../../utils/ProfileFetch"

export const AddProfile = () => {
    const [PrName, setPrName] = useState('')
    const [Desc, setDesc] = useState('')
    const [Profile,setProfile] = useState()
    const [message, setmessage] = useState()
    const Navigate = useNavigate()

       //handleLogout
       const handleLogout = async () => {
        try{
          const respone = await doLogout()
          if(!respone.ok){
            Navigate('/login')
          }
  
          const json = await respone.json()
          alert(json.msg)
          Navigate('/login')
        }catch(error){
          console.error(error)
        }
      }

      //form
      const handleAdd = async (e) => {
        e.preventDefault()
        try{
            const respone = await formProfile(PrName,Desc,Profile)
            if(!respone.ok){
                Navigate('/login')
            }

            const json = await respone.json()
            if(respone.status === 203){
                setmessage(json.data)
                return false
            }

            alert(json.msg)
            window.location.reload()
        }catch(error){
            console.error(error)
        }
      }

    return(
        <>
          <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Insert Profile</Card.Title>
    
        {
            message ?    
            <ul>
               {
                 message.map((e) => (
                    <li key={e.msg}>{e.msg}</li>
                 ))
               }
            </ul>
            :
          <p>IF you Close, You can't Go to dasbord profile</p>
        }
      
        <br></br>
        <form onSubmit={handleAdd}>
        <Form.Control
              type="text"
              placeholder="Profile Name"
              name="PrName"
              onChange={(e) => setPrName(e.target.value)}
              required
            />
        <br></br>
          <Form.Control
              type="text"
              placeholder="Description"
              name="Desc"
              onChange={(e) => setDesc(e.target.value)}
              required
            />
           <br></br>
          <Form.Control
              type="file"
              placeholder="Profile"
              name="Profile"
              onChange={(e) => setProfile(e.target.files)}
              required
            />
         <br></br>
        <Button type="submit">Submit</Button>
        </form>
        <br></br>
       <Button variant="danger" onClick={() => handleLogout()}>Logout</Button>
      </Card.Body>
    </Card>
        </>
    )
}