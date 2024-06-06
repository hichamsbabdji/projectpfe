/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/djcLGSNo0io
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function y() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <GroupIcon className="h-6 w-6 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
        </div>
        <p className="mt-1 text-3xl font-semibold text-gray-900">150</p>
        <p className="mt-1 text-sm text-gray-500">The total number of users with access to the system.</p>
      </div>
      <Card className="bg-white shadow rounded-lg">
        <CardHeader>
          <CardTitle>Access Logs</CardTitle>
          <CardDescription>The most recent access events recorded.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Door</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900">John Doe</div>
                      <div className="text-sm text-gray-500">johndoe@example.com</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>Main Entrance</TableCell>
                <TableCell>2:15 PM</TableCell>
                <TableCell>
                  <Badge variant="secondary">Granted</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900">Sarah Miller</div>
                      <div className="text-sm text-gray-500">sarahmiller@example.com</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>Side Entrance</TableCell>
                <TableCell>3:45 PM</TableCell>
                <TableCell>
                  <Badge variant="secondary">Granted</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900">Michael Johnson</div>
                      <div className="text-sm text-gray-500">michaeljohnson@example.com</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>Rear Entrance</TableCell>
                <TableCell>5:30 PM</TableCell>
                <TableCell>
                  <Badge variant="default">Denied</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function GroupIcon(props : any) {
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
      <path d="M3 7V5c0-1.1.9-2 2-2h2" />
      <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
      <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
      <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
      <rect width="7" height="5" x="7" y="7" rx="1" />
      <rect width="7" height="5" x="10" y="12" rx="1" />
    </svg>
  )
}
