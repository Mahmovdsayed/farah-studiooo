'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface IProps {
    children: React.ReactNode;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title?: string;
    description?: string;
    mainButtonTitle?: string;
    mainButtonIcon?: React.ReactNode;
    mainButtonClassName?: string;
}
const DialogContainer = ({
    children,
    open,
    setOpen,
    title,
    description,
    mainButtonTitle,
    mainButtonClassName,
    mainButtonIcon
}: IProps) => {

    return <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button" variant="default" className={mainButtonClassName}>{mainButtonIcon} {mainButtonTitle}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="text-start">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    </>;
};

export default DialogContainer;