import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { GroupIcon } from "./User"
import RoomsTable, { Room } from "@/components/RoomsTable"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import AddRoom from "@/components/AddRoom"

const Rooms = () => {
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
      const fetchDoors = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'rooms'));
          const doorsList = querySnapshot.docs.map((doc) => ({
            id : doc.id,
            name: doc.data().name,
            status: doc.data().status,          
          })) as Room[];
          setRooms(doorsList);
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
          <h3 className="text-lg font-semibold text-gray-900">Total Rooms</h3>
        </div>
        <p className="mt-1 text-3xl font-semibold text-gray-900"  > {rooms.length }  </p>
        <p className="mt-1 text-sm text-gray-500">The total number of rooms.</p>
      </div>
      <Card className="bg-white shadow rounded-lg">
        <CardHeader>
          <CardDescription>
            <div className="flex justify-between items-center  p-3 border-b-2 border-gray-200 " >
              <span>All users </span>
              <Dialog>
                 <DialogTrigger asChild > 
              <Button variant="outline" className="px-5 font-semibold text-slate-900 "  >Add room</Button>
                 </DialogTrigger>
                 <DialogContent  >
                  
                   <AddRoom />
                 </DialogContent>
              </Dialog>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
         <RoomsTable rooms={rooms}/>
        </CardContent>
      </Card>
    </div>
  )
}

export default Rooms