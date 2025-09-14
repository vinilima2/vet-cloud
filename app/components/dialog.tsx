import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

export interface DialogProps {
    children: any,
    titulo: string,
    conteudo: string,
    onConfirm: Function
}

export default function Dialog(props: DialogProps) {
    return (
        <AlertDialog>
            {props.children}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{props.titulo}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {props.conteudo}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClickCapture={() => props.onConfirm()}>Ok</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}