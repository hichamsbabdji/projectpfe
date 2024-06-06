import { TableCell, TableRow } from './ui/table'
import {useNavigate } from 'react-router-dom'
import { Room } from './RoomsTable'
import { Button } from './ui/button'
import { Dialog } from '@radix-ui/react-dialog'
import { DialogContent, DialogDescription, DialogHeader, DialogTrigger } from './ui/dialog'
import AddEditAuthorization from './AddEditAuthorization'

function RoomsTableRow({room} : {room : Room} ) {
    const navigate = useNavigate()
    return (
     <TableRow>
        <TableCell>{room.name}</TableCell>
        <TableCell>{room.status}</TableCell>
        <TableCell>
            <Button  variant="outline" onClick={()=> {
                navigate(room.id)
            }}  > doors </Button>
        </TableCell>
      <TableCell> 
      <Dialog>
          <DialogTrigger asChild  >
               <Button variant="secondary"> authorization </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader> New access</DialogHeader>
            <DialogDescription > Enter User id {" (Card id )"} </DialogDescription> 
              <AddEditAuthorization room={room.id} />
          </DialogContent>
      </Dialog> 
      </TableCell>
     </TableRow>

  )
}


export default RoomsTableRow