
import {CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger , DialogContent ,DialogHeader,DialogDescription  } from "@/components/ui/dialog"
import AddEditUser from "@/components/AddEditUser"
import UserTable, { User } from "@/components/UserTable"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"



export default function Component() {
  const [users , setUsers] = useState<User[]>([])
   useEffect(()=>{
    async function getUsers() {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          role : doc.data().role,
          status : doc.data().status,
          firstname : doc.data().firstname,
          lastname : doc.data().lastname,
          lastEntered : "21/09/2000"
        })) as User[] ;
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching roles: ', error);
      }
    }
    getUsers()
   },[])
   console.log(users)
 
  return (
    <div className="flex flex-col space-y-4">
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <GroupIcon className="h-6 w-6 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
        </div>
        <p className="mt-1 text-3xl font-semibold text-gray-900"  > {users.length }  </p>
        <p className="mt-1 text-sm text-gray-500">The total number of users with access to the system.</p>
      </div>
      <Card className="bg-white shadow rounded-lg">
        <CardHeader>
          <CardDescription>
            <div className="flex justify-between items-center  p-3 border-b-2 border-gray-200 " >
              <span>All users </span>
              <Dialog>
                 <DialogTrigger asChild > 
              <Button variant="outline" className="px-5 font-semibold text-slate-900 "  >Add user</Button>
                 </DialogTrigger>
                 <DialogContent  >
                   <DialogHeader> New user </DialogHeader>
                   <DialogDescription> fill the form to add a new user </DialogDescription>
                   <AddEditUser  />
                 </DialogContent>
              </Dialog>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
         <UserTable users={users} />
        </CardContent>
      </Card>
    </div>
  )
}

export function GroupIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 7V5c0-1.1.9-2 2-2h2" />
      <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
      <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
      <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
      <rect width="7" height="5" x="7" y="7" rx="1" />
      <rect width="7" height="5" x="10" y="12" rx="1" />
    </svg>
  )
}