import { TableCell, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { Log } from './LogsTable'
import { useEffect, useState } from 'react';
import { User } from './UserTable';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';


const LogsTableRow = ({log} : {log :Log} ) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const usersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as User[];
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  const getUserNameById = (userId: string) => {
    const user = users.find(user => user.id === userId);
    return user ? `${user.firstname} ${user.lastname}` : 'Unknown User';
  };
  
  console.log(log.dateEntrer.toDate())
  return(
    <TableRow >
        <TableCell>{log?.doorID}</TableCell>
    <TableCell>
      {getUserNameById(log?.userID) }
    </TableCell>
    <TableCell>{log.role}</TableCell>
    <TableCell>{log.dateEntrer?.toDate()?.getDay()+ "/"+ log.dateEntrer?.toDate()?.getMonth() + "/" + log.dateEntrer?.toDate()?.getFullYear() + " " + log.dateEntrer?.toDate()?.getHours() + ":" +log.dateEntrer?.toDate()?.getMinutes()  }</TableCell>
    <TableCell>{ log.dateSortie ?  log.dateSortie?.toDate()?.getDay()+ "/"+ log.dateSortie?.toDate()?.getMonth() + "/" + log.dateSortie?.toDate()?.getFullYear() + " " + log.dateSortie?.toDate()?.getHours() + ":" +log.dateSortie?.toDate()?.getMinutes() : "Still in" }</TableCell>
    <TableCell>
      <Badge className='px-4 py-2' variant={log.status === "IN" ? "secondary" : "destructive" } >{log.status}</Badge>
    </TableCell>
  </TableRow>
  )
}
export default LogsTableRow