import { Timestamp } from "firebase/firestore"
import LogsTableRow from "./LogsTableRow"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table"



export interface Log {
    id? : string
    userID : string
    doorID: string
    room : string
    role: string
    status : string
    dateEntrer: Timestamp
    dateSortie: Timestamp
   }

function LogsTable({logs} : {logs :  Log[]}) {
  return (
    <Table>
      
      <TableHeader>
              <TableRow>
              <TableHead>DoorID</TableHead>
                <TableHead>UserID</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Date enter</TableHead>
                <TableHead>Date Sortie</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {logs.map(log => <LogsTableRow key={log.id} log={log} /> )}
            </TableBody>
    </Table>
)
}

export default LogsTable