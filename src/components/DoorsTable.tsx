
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table"

import DoorsTablerow from "./DoorsTablerow"

export interface Door {
    id? : string
    name: string;
    status: string;
    room : string
  }
const DoorsTable = ({doors  }: { doors: Door [] } ) => {
  return (
    <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name door</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>New access</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {doors.map((door) =><DoorsTablerow key={door.name} door={door} /> )}
            </TableBody>
    </Table>
)
}

export default DoorsTable