
import { Table, TableBody, TableHead, TableHeader, TableRow } from './ui/table'
import RoomsTableRow from './RoomsTableRow';

export interface Room {
    id : string
    name: string;
    status: string;
  }
function RoomsTable({rooms} : {rooms  : Room[] } ) {

 
  return (
    <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name Room</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>doors</TableHead>
                <TableHead> Authorization </TableHead>


              </TableRow>
            </TableHeader>
            <TableBody>
                {rooms.map((room) =><RoomsTableRow key={room.id} room={room} /> )}
            </TableBody>
    </Table>
)
}

export default RoomsTable