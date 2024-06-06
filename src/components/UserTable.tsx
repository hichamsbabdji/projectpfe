import UserTableRow from "./UserTableRow"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table"

export interface User {
 id? : string
 firstname: string
 lastname : string
 role: string
 status : string
 lastEntered : string
 unauthorized : number
}

const UserTable = ({users} : {users :  User[] } ) => {
  return (
    <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>id</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Last Entered</TableHead>
                <TableHead>Status</TableHead>
                
              </TableRow>
            </TableHeader>
            <TableBody>
                {users.map(user => <UserTableRow key={user.id} user={user} /> )}
            </TableBody>
    </Table>
)
}

export default UserTable