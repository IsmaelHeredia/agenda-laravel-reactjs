import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotaFijaPresentational from "./NotaFijaPresentational";
import { Nota } from "@/types/app/notas";

interface NotaFijaContainerProps {
    nota: Nota;
}

const NotaFijaContainer: React.FC<NotaFijaContainerProps> = ({ nota }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event: any, reason: string) => {
        if (reason && reason === "backdropClick") {
            return;
        }
        setOpen(false);
    };

    const handleEditClick = (id: number) => {
        navigate("/notas/" + id + "/editar");
    };

    return (
        <NotaFijaPresentational
            nota={nota}
            open={open}
            handleClickOpen={handleClickOpen}
            handleClose={handleClose}
            handleEditClick={handleEditClick}
        />
    );
};

export default NotaFijaContainer;
