import { Calendar, ChevronsLeftRight, Home, Inbox, LogOut, PawPrint, Pencil, Search, Settings, Syringe, User2, UserLock } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

// Menu items.
const items = [
  {
    title: "Início",
    url: "#",
    icon: Home,
  },
  {
    title: "Notificações",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Agendamentos",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Tutores",
    url: "#",
    icon: User2,
  },
  {
    title: "Administração",
    url: "#",
    icon: UserLock,
  },
  {
    title: "Animais",
    url: "#",
    icon: PawPrint,
  },
  {
    title: "Vacinas",
    url: "#",
    icon: Syringe,
    disabled: true
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage />
            <AvatarFallback className="rounded-lg">VC</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium"></span>
            <span className="text-muted-foreground truncate text-xs">

            </span>
          </div>
          <Pencil className="ml-auto size-4" />
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>VetCloud</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className={item.disabled ? 'cursor-not-allowed bg-gray-500/5' : ''}>
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
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <span>Configurações</span>
          <Settings className="ml-auto size-4" />
        </SidebarMenuButton>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <span>Sair</span>
          <LogOut className="ml-auto size-4" />
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}