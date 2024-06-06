
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormEvent, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth/cordova"
import { auth } from "@/lib/firebase"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"


export default function Login() {
    const {toast} = useToast()
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const navigate = useNavigate()
    async function handelSubmit(e : FormEvent<HTMLFormElement> ) {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth,email,password)
            navigate("dashboard") 
            toast({
                title:"Loged in! ",
                description:"Welcome back"
            })
        } catch (error) {
            toast({
                title:"Login failed !",
                description:"Wrong credentials",
                variant:"destructive"
            })
        }
            
    }
  return (
<section className=" h-screen flex items-center justify-center" >
    <div className="mx-auto flex max-w-[400px] my-auto flex-col items-center justify-center space-y-6 px-4 py-12 sm:px-6 lg:px-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign in to your account</h1>
        <p className="text-gray-500 dark:text-gray-400">Enter your email and password below to access your account.</p>
      </div>
      <form onSubmit={handelSubmit} className="w-full space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input value={email} onChange={(e)=> setEmail(e.target.value) }  id="email" placeholder="m@example.com" required type="email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input value={password} onChange={(e) => setPassword(e.target.value)}  id="password" required type="password" />
        </div>
        <Button className="w-full" type="submit">
          Sign in
        </Button>
      </form>
    </div>
</section>
  )
}