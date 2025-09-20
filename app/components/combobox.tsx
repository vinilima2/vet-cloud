import { useState } from "react";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "~/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "~/lib/utils";

interface ComboboxProps {
    label: string,
    onChange?: (props: any) => any,
    lista: Array<any>
}
export default function Combobox(props: ComboboxProps) {
    const [abrirPopover, setAbrirPopover] = useState(false)
    const [valorSelecionado, setValorSelecionado] = useState("")

    return (
        <Popover open={abrirPopover} onOpenChange={setAbrirPopover}>
            <PopoverTrigger asChild className="w-full">
                <Button
                    variant="outline"
                    role="combobox"
                    className="w-[200px] justify-between"
                >
                    {valorSelecionado
                        ? props.lista.find((objeto) => objeto.value === valorSelecionado)?.label as string
                        : props.label}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command className="w-full">
                    <CommandInput placeholder={props.label}  className="h-9 w-full" />
                    <CommandList results={5}>
                        <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                        <CommandGroup>
                            {props.lista.map((objeto) => (
                                <CommandItem
                                    key={objeto.value}
                                    value={objeto.value}
                                    onSelect={(currentValue) => {
                                        setValorSelecionado(currentValue === valorSelecionado ? "" : currentValue)
                                        setAbrirPopover(false)
                                        props.onChange?.(currentValue)
                                    }}
                                >
                                    {objeto.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            valorSelecionado === objeto.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}