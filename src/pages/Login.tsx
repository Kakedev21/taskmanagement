import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { toast } from 'react-toastify';
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAPI } from "../api/routes";
import useUserStore from "../store/userStore";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const { setUser, user, isAuthenticated, setIsAuthenticated } = useUserStore()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      const reponse = await userAPI.login({ email, password })
      setUser(reponse.data)
      setIsAuthenticated(true)
      navigate("/")
      toast.success("log")
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
    setLoading(false)
  };

  console.log(isAuthenticated, user)

  return (
    <div className="flex h-screen items-center justify-center bg-[#1a237e]">
      <div className="w-[400px] rounded-lg bg-white p-8">
        <h1 className="mb-6 text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-[#1a237e]" disabled={loading}>
            {loading ? "LOGGING IN..." : "LOGIN"}
          </Button>
          <p className="text-center text-sm">
            Don't have any account?
            <Button disabled={loading} onClick={() => navigate("/register")} type="button" variant="link" className="text-[#1a237e]">Register</Button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login