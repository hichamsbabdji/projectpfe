import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { TableCell, TableRow } from "./ui/table"
import { User } from "./UserTable"
import { Badge } from "./ui/badge"





const UserTableRow = ({user} : {user :User} ) => {
  return (
    <TableRow >
    <TableCell>
      <div className="flex items-center space-x-2">
      
                          <Avatar className=" bg-emerald-50 p-2 rounded-full " >
                            <AvatarFallback>{user.firstname.toUpperCase().charAt(0) + user.lastname.toUpperCase().charAt(0) }</AvatarFallback>
                          </Avatar>
                        
        <div>
          <div className="font-medium text-gray-900">{user.firstname + " " + user.lastname } </div>
        </div>
      </div>
    </TableCell>
    <TableCell>{user.id}</TableCell>
    <TableCell>{user.role}</TableCell>
    <TableCell>{user.lastEntered}</TableCell>
    <TableCell>
      <Badge variant="secondary"  >{user.status}</Badge>
    </TableCell>
  </TableRow>
  )
}

export default UserTableRow