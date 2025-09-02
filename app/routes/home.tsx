import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "~/components/ui/navigation-menu"
import { Card, CardDescription,  CardHeader, CardTitle } from "~/components/ui/card"


import Vet from "../assets/vet2.png";
import Calendar from "../assets/calendar.svg";
import Cancel from "../assets/cancel.svg";

import Dog from "../assets/dog.svg";

import Petting from "../assets/petting.svg";
import { Button } from "~/components/ui/button";
import Map from "../assets/map.png";
import { useNavigate } from "react-router";
export default function Home() {
  const navigate = useNavigate()

  return (
    <>
      <NavigationMenu className="mr-auto ml-auto justify-center-safe p-2" viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink>
              <a href="#" className="text-emerald-400">VetCloud</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink>
              <a href="#">Funções</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink>
              <a href="#">Sobre</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink>
              <a href="#">Exemplos</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="w-full p-6 flex  items-center justify-between">
        <div className="w-6/12 ml-auto mr-auto m-10">
          <Card className="p-5 bg-emerald-400/30">
            <CardHeader>
              <CardTitle className="text-4xl text-center">Bem vindo ao VetCloud</CardTitle>
              <CardDescription className="text-xl">Seu sistema de gerenciamento de atendimentos veterinários, com ele você consegue organizar seus atendimentos, além de disponibilizar..</CardDescription>
            </CardHeader>

            <Button className="w-full" onClick={() => navigate('login')}>Já faço parte do VetCloud</Button>
            <Button className="w-full" variant={"outline"} onClick={() => navigate('registro')}>Quero fazer parte</Button>
          </Card>
        </div>
      </div>
      <div className="bg-teal-950/45 p-6 ">
        <h1 className="text-4xl  text-center"><strong>Quem somos?</strong></h1>
        <div className="p-8 mb-4 flex justify-around items-center">
          <div className="w-3/6">
            <h1 className="text-3xl  text-center mb-5"><strong>Como surgiu o VetCloud?</strong></h1>
            <p>A VetCloud surgiu em função de Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam porro, modi, enim mollitia iusto nihil delectus libero commodi odit cupiditate molestiae repellat corporis ipsum vitae molestias vero quaerat rem ab?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores illo maxime eveniet quidem cupiditate ut itaque nostrum, doloremque totam deleniti nobis iste architecto aut molestiae iure optio adipisci quasi inventore!</p>
          </div>
          <img src={Vet} className="w-4/12" />
        </div>
        <hr/>
        <div className="p-8 mb-4 flex justify-around items-center">
          <img src={Map} className="w-4/12" />
          <div className="w-3/6">
            <h1 className="text-3xl  text-center mb-5"><strong>Ajudando clínicas do Brasil inteiro</strong></h1>
            <p>A VetCloud surgiu em função de Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam porro, modi, enim mollitia iusto nihil delectus libero commodi odit cupiditate molestiae repellat corporis ipsum vitae molestias vero quaerat rem ab?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores illo maxime eveniet quidem cupiditate ut itaque nostrum, doloremque totam deleniti nobis iste architecto aut molestiae iure optio adipisci quasi inventore!</p>
          </div>
        </div>
      </div>
      <hr/>
      <div className="bg-emerald-950/65 p-6">
        <h1 className="text-4xl  text-center"><strong>Principais funcionalidades</strong></h1>
        <div className="p-8 mb-4 flex justify-around items-center">
          <img src={Dog} className="w-4/12" />
          <div className="w-3/6">
            <h3 className="text-3xl mb-5"><strong>Organização para cuidar do seu PET</strong></h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis debitis, commodi cumque eveniet, magni cum, impedit vitae vero ullam asperiores voluptate nulla itaque ducimus recusandae provident doloribus tempore obcaecati? Tenetur.</p>
          </div>
        </div>
        <hr />

        <div className="p-8 mb-4 flex justify-around items-center">
          <div className="w-3/6">
            <h3 className="text-3xl mb-5"><strong>Unindo os melhores profissionais para você</strong></h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis debitis, commodi cumque eveniet, magni cum, impedit vitae vero ullam asperiores voluptate nulla itaque ducimus recusandae provident doloribus tempore obcaecati? Tenetur.</p>
          </div>
          <img src={Petting} className="w-4/12" />
        </div>
        <hr />
        <div className="p-8 mb-4 flex justify-around items-center">
          <img src={Calendar} className="w-4/12" />
          <div className="w-3/6">
            <h3 className="text-3xl mb-5"><strong>Gerencie seus atendimentos com eficácia</strong></h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis debitis, commodi cumque eveniet, magni cum, impedit vitae vero ullam asperiores voluptate nulla itaque ducimus recusandae provident doloribus tempore obcaecati? Tenetur.</p>
          </div>
        </div>
        <hr />
        <div className="p-8 mb-4 flex justify-around items-center">
          <div className="w-3/6">
            <h3 className="text-3xl mb-5"><strong>Controle de Imprevistos</strong></h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis debitis, commodi cumque eveniet, magni cum, impedit vitae vero ullam asperiores voluptate nulla itaque ducimus recusandae provident doloribus tempore obcaecati? Tenetur.</p>
          </div>
          <img src={Cancel} className="w-3/12" />
        </div>
      </div>
    </>
  )
}

