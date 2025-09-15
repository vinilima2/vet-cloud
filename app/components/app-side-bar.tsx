import { Calendar, Home, Inbox, LogOut, Pencil, Settings, Syringe, User, User2, UserLock } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import { Avatar } from "./ui/avatar"
import { Switch } from "./ui/switch"
import { useTheme } from "~/providers/theme-provider"
import { useLocation, useNavigate } from "react-router"
import { useAuth } from "~/providers/auth-provider"
import { AlertDialogTrigger } from "./ui/alert-dialog"
import Dialog from "./dialog"

interface AppSidebarProps {
  title: string,
  url: string,
  icon: any,
  disabled?: boolean
}
// Menu items.
const items : Array<AppSidebarProps> = [
  {
    title: "Início",
    url: "/home",
    icon: Home,
  },
  {
    title: "Notificações",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Agendamentos",
    url: "/agendamento",
    icon: Calendar,
  },
  {
    title: "Tutores",
    url: "/tutor",
    icon: User2,
  },
  {
    title: "Administração",
    url: "#",
    icon: UserLock,
  },
  {
    title: "Vacinas",
    url: "#",
    icon: Syringe,
    disabled: true
  },
]

export function AppSidebar() {
  const { theme, setTheme } = useTheme()
  const { realizarLogout } = useAuth()
  const navigate = useNavigate()

  const location = useLocation()

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="cursor-pointer"
        >
          <Avatar className="h-8 w-8 rounded-lg bg-primary flex justify-center items-center">
            <User className="text-background" />
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Joãozinho</span>
            <span className="text-muted-foreground truncate text-xs">
              Admin
            </span>
          </div>
        </SidebarMenuButton>
        <SidebarContent>
          <Switch checked={theme === 'dark'} onClick={() => {
            if (theme === 'dark') {
              setTheme('light')
            } else {
              setTheme('dark')
            }
          }} />
          <span className="truncate font-medium text-primary">Tema Escuro</span>
        </SidebarContent>

      </SidebarHeader>
      <SidebarContent className="mt-10">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={location?.pathname.includes(item.url)} asChild className={item.disabled ? 'cursor-not-allowed' : ''}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span> {item.disabled && <i className="text-right"><small>Em breve</small></i>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
        >
          <span>Configurações</span>
          <Settings className="ml-auto size-4" />
        </SidebarMenuButton>

        <Dialog titulo="Deseja realmente sair?" conteudo="Confirme para sair do VetCloud" onConfirm={() => {
          realizarLogout()
          navigate('/')
        }} >
          <AlertDialogTrigger>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <span>Sair</span>
              <LogOut className="ml-auto size-4" />
            </SidebarMenuButton>
          </AlertDialogTrigger>
        </Dialog>
      </SidebarFooter>
    </Sidebar>
  )
}