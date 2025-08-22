import React, { useRef, useState, useEffect, useTransition } from "react";
import { useMediaQuery } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Categoria, Nota } from "@/types/app/notas";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { type RichTextEditorRef } from "mui-tiptap";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";
import { useGetCategoriasQuery } from "@store/api/apiSlices";
import {
    useGetNotaQuery,
    useCreateNotaMutation,
    useUpdateNotaMutation,
} from "@store/api/apiSlices";
import { useSelector, useDispatch } from "react-redux";
import { changeNotePage } from "@/store/reducers/paginationSlice";
import { toastRedirect } from "@/utils/toastRedirect";
import { v4 as uuidv4 } from "uuid";
import GuardarNotaPresentation from "./GuardarNotaPresentation";
import { RootState } from "@/store/store";

const GuardarNotaContainer = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [isPending, startTransition] = useTransition();

    const { data: dataCategorias } = useGetCategoriasQuery({});
    const { data: dataNota, isLoading: isLoadingNota } = useGetNotaQuery(id, {
        skip: !id,
    });
    const [createNota, { isLoading: isLoadingCreate }] = useCreateNotaMutation();
    const [updateNota, { isLoading: isLoadingUpdate }] = useUpdateNotaMutation();
    const dispatch = useDispatch();
    const pagination: any = useSelector((state: RootState) => state.pagination);

    const [es_favorita, setEsFavorita] = useState(false);
    const [contenidoEditor, setContenidoEditor] = useState("");
    const [uuid, setUuid] = useState(uuidv4());
    const [disabled, setDisabled] = useState(false);

    const rteRef = useRef<RichTextEditorRef>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        reset,
    } = useForm<Nota>({
        defaultValues: {
            titulo: "",
            categorias: [],
            fecha_expiracion: null as Dayjs | null,
        },
    });

    useEffect(() => {
        if (dataNota?.nota && id && Number(id) > 0) {
            startTransition(() => {
                const nota = dataNota.nota;
                setValue("id", Number(id));
                setValue("titulo", nota.titulo);
                setValue("contenido", nota.contenido);
                setContenidoEditor(nota.contenido);
                setTimeout(() => {
                    rteRef.current?.editor?.commands.setContent(nota.contenido);
                }, 100);
                setEsFavorita(nota.favorita === 1);
                setValue("categorias", nota.categorias);
                reset({ categorias: nota.categorias });
                setValue("fecha_expiracion", nota.fecha_expiracion ? dayjs(nota.fecha_expiracion, "YYYY-MM-DD") : null);
                setUuid(nota.uuid);
            });
        }
    }, [dataNota, id, setValue, reset]);

    const handleClickGuardarNota: SubmitHandler<Nota> = (data) => {
        const categorias_id = data.categorias.map(categoria_item => categoria_item.id);
        let contenido = rteRef.current?.editor?.getHTML() || "";
        if (contenido === "<p></p>") {
            contenido = `<p>${data.titulo}</p>`;
        }
        const es_favorita_bd = es_favorita ? 1 : 0;
        const fecha_expiracion = data.fecha_expiracion?.format("YYYY-MM-DD") || null;

        const datosForm = {
            "titulo": data.titulo,
            "contenido": contenido,
            "categorias": categorias_id,
            "favorita": es_favorita_bd,
            "fecha_expiracion": fecha_expiracion,
            "uuid": uuid
        };

        const action = id ? updateNota({ id, ...datosForm }) : createNota(datosForm);

        action
            .unwrap()
            .then((payload: any) => {
                const mensaje = payload.message;

                if (payload.data) {
                    setDisabled(true);
                    if (!id) {
                        dispatch(changeNotePage({ page: 1 }));
                    }
                    toastRedirect(mensaje, navigate, "/notas", "success", Number(import.meta.env.VITE_TIMEOUT_REDIRECT));
                } else {
                    toast.warning(mensaje, { autoClose: Number(import.meta.env.VITE_TIMEOUT_TOAST) });
                }
            })
    };

    const cambiarEstadoFavorita = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEsFavorita(event.target.checked);
    };

    const handleClickReturn = () => {
        navigate("/notas");
    };

    return (
        <GuardarNotaPresentation
            isMobile={useMediaQuery("(max-width:600px)")}
            categorias={dataCategorias?.categorias || []}
            es_favorita={es_favorita}
            contenidoEditor={contenidoEditor}
            disabled={disabled}
            isLoading={isLoadingNota}
            isLoadingSave={isLoadingCreate || isLoadingUpdate}
            isPending={isPending}
            rteRef={rteRef}
            handleSubmit={handleSubmit}
            handleClickGuardarNota={handleClickGuardarNota}
            handleClickReturn={handleClickReturn}
            cambiarEstadoFavorita={cambiarEstadoFavorita}
            formControl={{
                register,
                errors,
                control,
            }}
            uuid={uuid}
        />
    );
};

export default GuardarNotaContainer;
