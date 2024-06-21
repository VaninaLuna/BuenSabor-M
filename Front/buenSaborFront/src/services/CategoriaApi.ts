import Categoria from "../models/Categoria";

export async function getCategorias() {
    const INSTRUMENTOS_ENDPOINT = 'https://buensabor-back-hpyp.onrender.com/categoria/all';

    try {
        const response = await fetch(INSTRUMENTOS_ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as Categoria[];
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloInsumo')
    }
}

export async function getArbolCategorias() {
    const INSTRUMENTOS_ENDPOINT = 'https://buensabor-back-hpyp.onrender.com/categoria/arbol';

    try {
        const response = await fetch(INSTRUMENTOS_ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as Categoria[];
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloInsumo')
    }
}

export async function getCategoriaPorID(id: number) {
    const INSTRUMENTO_ENDPOINT = `https://buensabor-back-hpyp.onrender.com/categoria/${id}`;

    try {
        const response = await fetch(INSTRUMENTO_ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as Categoria;
    } catch (e) {
        throw new Error('Error al hacer fetch de articuloInsumo')
    }
}

export async function getCategoriaPadreDesdeHijo(id: number) {
    const INSTRUMENTO_ENDPOINT = `https://buensabor-back-hpyp.onrender.com/categoria/padre/${id}`;

    try {
        const response = await fetch(INSTRUMENTO_ENDPOINT);

        if (!response.ok) {
            throw new Error(`Error al obtener los datos: ${response.status} ${response.statusText}`);
        }

        const json = await response.json();
        return json as Categoria;
    } catch (e) {
        throw new Error('Error al hacer fetch de categoria')
    }
}

export async function saveCategoria(categoria?: Categoria) {
    let endpoint = 'https://buensabor-back-hpyp.onrender.com/categoria';
    let method: string = "POST";

    if (categoria && categoria.id !== 0) {
        endpoint = `https://buensabor-back-hpyp.onrender.com/categoria/${categoria.id}`;
        method = "PUT";
    }

    await fetch(endpoint, {
        "method": method,
        "headers": {
            "Content-Type": 'application/json'
        },
        "body": JSON.stringify(categoria)
    });
}

//Delete logico
export async function updateEstadoEliminadoC(id: number) {
    const endpoint = `https://buensabor-back-hpyp.onrender.com/categoria/cambiar_estado_eliminado/${id}`

    try {
        const response = await fetch(endpoint, {
            "method": "PUT",
            "headers": {
                "Content-Type": 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar la categoria: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (e) {
        throw new Error('Error al hacer fetch de categoria')
    }
}