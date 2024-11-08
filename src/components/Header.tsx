import { Bell, User, LogOut, Settings } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useUserStore from "../store/userStore";

const Header = () => {
  const { isAuthenticated, user, logout } = useUserStore()
  const navigate = useNavigate()

  return (
    <>
      <header className="flex h-14 items-center justify-between bg-[#1a237e] px-4 lg:h-[60px]">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold text-white">Task Management</h1>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="text-white">
                <Bell className="h-5 w-5" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="Avatar" />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="rounded-full bg-white px-2 py-1 text-xs">Member</span>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="ghost"
                      className="flex w-full justify-start gap-2"
                      onClick={() => navigate('/settings')}
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex w-full justify-start gap-2 text-red-500 hover:text-red-500"
                      onClick={() => {
                        logout()
                        navigate('/')
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <Button
              variant="outline"
              className="text-[#1a237e]"
              onClick={() => navigate("/")}
            >
              Login
            </Button>
          )}
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default Header