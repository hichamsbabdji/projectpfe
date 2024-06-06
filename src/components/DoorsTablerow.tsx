import { Badge } from "./ui/badge"
import { TableCell, TableRow } from "./ui/table"
import { Door } from "./DoorsTable"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { useState } from "react"
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { User } from "./UserTable"
import { useParams } from "react-router-dom"
import { toast } from "./ui/use-toast"
import { Authorization } from "./AddEditAuthorization"


function DoorsTablerow  ({ door }: { door: Door }){
  const [userId , setUserId] = useState("")
  const {id : roomId} = useParams();
  async function accessDoor() {
    const userDocRef = doc(db,"users",userId)
    const userDoc =  await getDoc(userDocRef)
    const user  = userDoc.data() as User 
    const authorizationQuery = query(collection(db, 'authorization'), where('room', '==', roomId))
    const authorizationQuerySnapchot = await getDocs(authorizationQuery) ;
    const authorization : Authorization = authorizationQuerySnapchot.docs[0].data() as Authorization

    if ( !authorization.role.includes(user.role) ){
        if(user.unauthorized >= 2){
          await addDoc(collection(db, 'notification'),{
            mesage : "unauthorized access has been detected by user " + userDoc.id,
            date_notifi : null
          })
        }
        await updateDoc(userDocRef , {
          ...user,
          unauthorized : isNaN(user.unauthorized) ? 1 : user.unauthorized + 1 
        })
        toast({title : "Access failed"  , description : "user is anauthorized to access the room" , variant : 'destructive' })
       } else {
          await addDoc(collection(db, "logs"), {
          userID : userDoc.id,
          room : roomId,
          doorID : door.id,
          dateEntrer : serverTimestamp(),
          dateSortie: null,
          status : "IN",
          role : user.role
        })
        toast({variant : "success"  , title : "Success" , content : "user " + userDoc.id + " accessed door" + roomId + " successfuly" })
    }
     
  }
  return (
    <TableRow >
    <TableCell>
      <div className="flex items-center space-x-2">                        
        <div>
          <div className="font-medium text-gray-900">{door.name  } </div>
        </div>
      </div>
    </TableCell>
   
    <TableCell>
      <Badge variant={ door.status === "blocked" ? "destructive" : "secondary" }  >{door.status }</Badge>
    </TableCell>
    <TableCell>
      <Dialog>
          <DialogTrigger asChild  >
               <Button variant="secondary"> access door </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader> New access</DialogHeader>
            <DialogDescription > Enter User id {" (Card id )"} </DialogDescription> 
            <Input value={userId} onChange={(e) => setUserId(e.target.value)}  />
            <Button onClick={accessDoor} > access door </Button>
          </DialogContent>
      </Dialog> 
      </TableCell>
  </TableRow>
  )
}

export default DoorsTablerow
