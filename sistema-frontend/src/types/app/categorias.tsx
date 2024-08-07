interface Categoria {
    id: number
    nombre: string
}

interface FiltrarCategoria {
    buscarNombre: string
}

export type { Categoria, FiltrarCategoria };