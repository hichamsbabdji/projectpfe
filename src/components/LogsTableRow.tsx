import { TableCell, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { Log } from './LogsTable'


const LogsTableRow = ({log} : {log :Log} ) => {
  console.log(log.dateEntrer.toDate())
  return(
    <TableRow >
        <TableCell>{log?.doorID}</TableCell>
    <TableCell>
      {log?.userID}
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