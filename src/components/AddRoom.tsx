import { addDoc, collection } from 'firebase/firestore'
import  {  useState } from 'react'
import { toast } from './ui/use-toast'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { DialogClose } from './ui/dialog'
import { Button } from './ui/button'
import { db } from '@/lib/firebase'

const AddRoom = () => {
    const [name , setName] = useState("")
  
    

    async function addRoom (){
        try {
         await addDoc(collection(db, "rooms") , {
            name,
            status : "active"
          } )
           toast({title : "Success" , description : "room created successfuly" , variant : "success" })
  
        } catch (error) {
          console.log(error)
          toast({variant:"destructive" , title : "Failed" , content : "failed  to create room" } )
        }
    }
    return (
      <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add New room</CardTitle>
        <CardDescription>Enter the rooms details.</CardDescription>
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
        <Button onClick={addRoom} className="mx-auto" type="submit">
          Add room
        </Button>
        </DialogClose>
      </CardFooter>
    </Card>
    )
  }

export default AddRoom