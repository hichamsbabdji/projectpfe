import { db } from '@/lib/firebase'
import { addDoc, collection } from 'firebase/firestore'
import  { useState } from 'react'
import { toast } from './ui/use-toast'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { DialogClose } from './ui/dialog'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom'

function AddDoor() {
    const [name , setName] = useState("")
    const room = useParams()

    async function addDoor (){
        try {
         await addDoc(collection(db, "doors") , {
            name,
            status : "active",
            room : room.id
          } )
           toast({title : "Success" , description : "door created successfuly" , variant : "success" })
  
        } catch (error) {
          console.log(error)
          toast({variant:"destructive" , title : "Failed" , content : "failed  to create door" } )
        }
    }
    return (
      <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add New door</CardTitle>
        <CardDescription>Enter the door details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName"> Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value) } id="firstName" placeholder="John" />
          </div>
        </div>
      
      </CardContent>
      <CardFooter>
        <DialogClose>
        <Button onClick={addDoor} className="ml-auto" type="submit">
          Add door
        </Button>
        </DialogClose>
      </CardFooter>
    </Card>
)
}

export default AddDoor