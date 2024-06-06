import { Label } from "@radix-ui/react-label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { db } from "@/lib/firebase"
import {  addDoc, collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { toast } from "./ui/use-toast"
import { DialogClose } from "./ui/dialog"

const AddEditUser = () => {
  const [firstname , setFirstname] = useState("")
  const [lastname , setLastname] = useState("")
  const [role , setRole] = useState("")
  const [roles , setRoles] = useState<{id : string , name : string}[]>([] )
  
  useEffect(()=>{
    async function getRoles() {
      try {
        const querySnapshot = await getDocs(collection(db, 'role'));
        const rolesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name : doc.data().name
        }));
        setRoles(rolesList);
      } catch (error) {
        console.error('Error fetching roles: ', error);
      }
    }
     getRoles()
  },[])
  console.log(roles)
  async function addUser (){
      try {
       const docRef = await addDoc(collection(db, "users") , {
          firstname,
          lastname,
          role,
          status : "active"
        } )
         toast({title : "Success" , description : "user created successfuly" , variant : "success" })

      } catch (error) {
        console.log(error)
        toast({variant:"destructive" , title : "Failed" , content : "failed  to create user" } )
      }
  }
  return (
    <Card className="w-full max-w-md">
    <CardHeader>
      <CardTitle>Add New User</CardTitle>
      <CardDescription>Enter the user's details and select their role.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input value={firstname} onChange={(e) => setFirstname(e.target.value) } id="firstName" placeholder="John" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input value={lastname} onChange={(e) => setLastname(e.target.value) } id="lastName" placeholder="Doe" />
        </div>
      </div>
      <div className="space-x-3">
        <Label htmlFor="role">Role</Label>
            <select onChange={(e) => setRole(e.target.value) } className="p-2 " name="Role" id="role" >
            {roles.map(role => <option  key={role.id} value={role.name}> {role.name} </option> )}
            </select>
      </div>
    </CardContent>
    <CardFooter>
      <DialogClose>
      <Button onClick={addUser} className="ml-auto" type="submit">
        Add User
      </Button>
      </DialogClose>
    </CardFooter>
  </Card>
  )
}

export default AddEditUser