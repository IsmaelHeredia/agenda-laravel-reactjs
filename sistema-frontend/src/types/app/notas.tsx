import { Dayjs } from "dayjs";

interface Categoria {
    nombre: string
    id: number
}

interface Nota {
    id: number
    titulo: string
    contenido: string
    favorita: number
    fecha_expiracion: Dayjs | null
    uuid: string
    categorias: Categoria[]
}

interface FiltrarNota {
    buscarNombre: string
    buscarCategorias: Categoria[]
    buscarFavorita: boolean
}

export type { Categoria, Nota, FiltrarNota };