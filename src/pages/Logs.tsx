
import {CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"


import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import LogsTable, { Log } from "@/components/LogsTable"
import { useEffect, useState } from "react"
export default function Component() {
  const [log , setLogs] = useState<Log[]>([])
   useEffect(()=>{
    async function getUsers() {
      try {
        const querySnapshot = await getDocs(collection(db, 'logs'));
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          role : doc.data().role,
          status : doc.data().status,
          userID : doc.data().userID,
          doorID : doc.data().doorID,
          dateEntrer : doc.data().dateEntrer,
          dateSortie : doc.data().dateSortie
        })) as Log[] ;
        setLogs(usersList);
      } catch (error) {
        console.error('Error fetching roles: ', error);
      }
    }
    getUsers()
   },[])
   
 
  return (
    <div className="flex flex-col space-y-4">
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <GroupIcon className="h-6 w-6 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">Total Logs</h3>
        </div>
        <p className="mt-1 text-3xl font-semibold text-gray-900"  > {log.length }  </p>
        <p className="mt-1 text-sm text-gray-500">The total number of logs.</p>
      </div>
      <Card className="bg-white shadow rounded-lg">
        <CardHeader>
          <CardDescription>
            <div className="flex justify-between items-center  p-3 border-b-2 border-gray-200 " >
              <span>All logs </span>
             
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
         <LogsTable logs={log} />
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