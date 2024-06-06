import { Button } from "@/components/ui/button"
import {Card , CardContent ,CardDescription , CardHeader} from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { GroupIcon } from "./User"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import DoorsTable, { Door } from "@/components/DoorsTable"
import AddDoor from "@/components/AddDoor"
import { useParams } from "react-router-dom"



export default function Doors() {
     
const [Doors, setDoors] = useState<Door[]>([]);
const room = useParams<{id : string}>()

  useEffect(() => {
    const fetchDoors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'doors'));
        const doorsList = querySnapshot.docs.map((doc) => ({
          id : doc.id,
          name: doc.data().name,
          status: doc.data().status, 
          room : doc.data().room         
        })) as Door[];
       setDoors( doorsList.filter(el =>  room.id === el.room ))
        
      } catch (error) {
        console.error('Error fetching doors: ', error);
      }
    };

    fetchDoors();
  }, []);
 
  return ( 
    <div className="flex flex-col space-y-4">
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex items-center space-x-2">
        <GroupIcon className="h-6 w-6 text-gray-500" />
        <h3 className="text-lg font-semibold text-gray-900">Total doors</h3>
      </div>
      <p className="mt-1 text-3xl font-semibold text-gray-900"  > {Doors.length }  </p>
      <p className="mt-1 text-sm text-gray-500">The total number of doors.</p>
    </div>
    <Card className="bg-white shadow rounded-lg">
      <CardHeader>
        <CardDescription>
          <div className="flex justify-between items-center  p-3 border-b-2 border-gray-200 " >
            <span>All users </span>
            <Dialog>
               <DialogTrigger asChild > 
            <Button variant="outline" className="px-5 font-semibold text-slate-900 "  >Add door</Button>
               </DialogTrigger>
               <DialogContent  >
                
                 <AddDoor />
               </DialogContent>
            </Dialog>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
       <DoorsTable doors={Doors}/>
      </CardContent>
    </Card>
  </div>
         )
};

