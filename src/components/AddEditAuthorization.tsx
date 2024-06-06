import { Label } from "@radix-ui/react-label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "@/lib/firebase"
import { DialogClose } from "./ui/dialog"

export interface Authorization {
    endAt : Date 
    role : string[]
    startAt : Date
    room : string
    statrtAt : Date
}

const AddEditAuthorization = ({room} : {room : string} ) => {
    const [roles , setRoles] = useState<{id : string , name : string}[]>([] )
    const [selectedRoles , setSelecedRoles] = useState<string[]>([])
    const [startAt , setStartAt] = useState<Date | undefined>(new Date())
    const [endAt , setEndAt] = useState<Date | undefined>(new Date())

    useEffect(()=>{
      async function getRoles() {
          const querySnapshot = await getDocs(collection(db, 'role'));
          const rolesList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            name : doc.data().name
          }));
          setRoles(rolesList); 
        }
        getRoles()
    },[])
    function selectRole(name : string){
        
        if(!selectedRoles.includes(name))
           setSelecedRoles(prev=> [...prev , name])
       else
           setSelecedRoles(prev => prev.filter(item => item !== name))
   }
    async function submit(){
        await addDoc(collection(db, "authorization") , {
           startAt : Timestamp.fromDate(startAt ?? new Date()),
           endAt : Timestamp.fromDate(endAt ?? new Date()),
           role : selectedRoles,
           room  
        })
     }
    
  return (
    <Card className="w-full max-w-md">
    <CardHeader>
      <CardTitle>Room authorization</CardTitle>
      <CardDescription>Fill the form with room authorization details </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button id="startDate" variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                Select start date
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar onSelect={setStartAt} mode="single" initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button id="endDate" variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                Select end date
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar  onSelect={setEndAt } mode="single" initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div>
        <Label className=" font-semibold text-slate-950 mb-4" htmlFor="roles">Roles</Label>
          {roles.map(role => {
            return (
              <div className="flex items-center   " >
                <Label className=" text-slate-850 w-2/4 "  htmlFor={role.id} > {role.name}</Label>
                <input type="checkbox" className=" ml-12" id={role.id} checked= {selectedRoles.includes(role.name)}  value={role.name} onChange={()=>selectRole(role.name)}  />
            </div>
        )
    
          } )}
      </div>
    </CardContent>
    <CardFooter>
        <DialogClose>
          <Button className="ml-auto" onClick={submit} >submit</Button>
        </DialogClose>
      
    </CardFooter>
  </Card>
)

}
function CalendarDaysIcon(props : any) {
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
        <path d="M8 14h.01" />
        <path d="M12 14h.01" />
        <path d="M16 14h.01" />
        <path d="M8 18h.01" />
        <path d="M12 18h.01" />
        <path d="M16 18h.01" />
      </svg>
    )
  }
export default AddEditAuthorization