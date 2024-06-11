
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { ResponsiveBar } from "@nivo/bar"
import {ResponsiveLine} from "@nivo/line"
import { Badge } from "@/components/ui/badge"
import { User } from "@/components/UserTable"
import { useEffect, useState } from "react"
import { Door } from "@/components/DoorsTable"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
const Home = () => {

  const [Doors, setDoors] = useState<Door[]>([]);
  const [logCount, setLogCount] = useState<number>(0);


  useEffect(() => {
    const fetchDoors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'doors'));
        const doorsList = querySnapshot.docs.map((doc) => ({
          name: doc.data().name,
          status: doc.data().status,
        })) as Door[];
        setDoors(doorsList);
      } catch (error) {
        console.error('Error fetching doors: ', error);
      }
    };

    fetchDoors();
  }, []);
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
  
   useEffect(() => {
    const fetchLogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'logs'));
        setLogCount(querySnapshot.size);
      } catch (error) {
        console.error('Error fetching logs: ', error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Total Doors</CardTitle>
                <CardDescription>The total number of doors in the access system.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-4xl font-bold">{Doors.length}</div>
                <DoorOpenIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Users</CardTitle>
                <CardDescription>The total number of users to the system.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-4xl font-bold"> {users.length}</div>
                <UsersIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Access Events</CardTitle>
                <CardDescription>The total number of access events recorded.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-4xl font-bold">{logCount}</div>
                <CalendarIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              </CardContent>
            </Card>
          
          </div>
          
        </main>

  )
}
function LineChart(props : any) {
    return (
      <div {...props}>
        <ResponsiveLine
          data={[
            {
              id: "Desktop",
              data: [
                { x: "Jan", y: 43 },
                { x: "Feb", y: 137 },
                { x: "Mar", y: 61 },
                { x: "Apr", y: 145 },
                { x: "May", y: 26 },
                { x: "Jun", y: 154 },
              ],
            },
            {
              id: "Mobile",
              data: [
                { x: "Jan", y: 60 },
                { x: "Feb", y: 48 },
                { x: "Mar", y: 177 },
                { x: "Apr", y: 78 },
                { x: "May", y: 96 },
                { x: "Jun", y: 204 },
              ],
            },
          ]}
          margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
          xScale={{
            type: "point",
          }}
          yScale={{
            type: "linear",
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 16,
          }}
          axisLeft={{
            tickSize: 0,
            tickValues: 5,
            tickPadding: 16,
          }}
          colors={["#2563eb", "#e11d48"]}
          pointSize={6}
          useMesh={true}
          gridYValues={6}
          theme={{
            tooltip: {
              chip: {
                borderRadius: "9999px",
              },
              container: {
                fontSize: "12px",
                textTransform: "capitalize",
                borderRadius: "6px",
              },
            },
            grid: {
              line: {
                stroke: "#f3f4f6",
              },
            },
          }}
          role="application"
        />
      </div>
    )
  }
  function BarChart(props : any) {
    return (
      <div {...props}>
        <ResponsiveBar
          data={[
            { name: "Jan", count: 111 },
            { name: "Feb", count: 157 },
            { name: "Mar", count: 129 },
            { name: "Apr", count: 150 },
            { name: "May", count: 119 },
            { name: "Jun", count: 72 },
          ]}
          keys={["count"]}
          indexBy="name"
          margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
          padding={0.3}
          colors={["#2563eb"]}
          axisBottom={{
            tickSize: 0,
            tickPadding: 16,
          }}
          axisLeft={{
            tickSize: 0,
            tickValues: 4,
            tickPadding: 16,
          }}
          gridYValues={4}
          theme={{
            tooltip: {
              chip: {
                borderRadius: "9999px",
              },
              container: {
                fontSize: "12px",
                textTransform: "capitalize",
                borderRadius: "6px",
              },
            },
            grid: {
              line: {
                stroke: "#f3f4f6",
              },
            },
          }}
          tooltipLabel={({ id }) => `${id}`}
          enableLabel={false}
          role="application"
          ariaLabel="A bar chart showing data"
        />
      </div>
    )
  }
  function BadgeAlertIcon(props : any) {
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
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </svg>
    )
  }
  
  function UsersIcon(props : any ) {
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
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  }
  function CalendarIcon(props : any) {
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
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
      </svg>
    )
  }
  function DoorOpenIcon(props : any) {
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
        <path d="M13 4h3a2 2 0 0 1 2 2v14" />
        <path d="M2 20h3" />
        <path d="M13 20h9" />
        <path d="M10 12v.01" />
        <path d="M13 4.562v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z" />
      </svg>
    )
  }
export default Home