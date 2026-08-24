/**
 * Maneja las respuestas de la API, verificando si la respuesta es exitosa y devolviendo los datos en formato JSON.
 * @param response - La respuesta de la API
 * @returns - Una promesa que resuelve con los datos en formato JSON si la respuesta es exitosa.
 */
export const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        throw new Error(`Error en la petición: ${response.status}`);
    }
    return response.json() as Promise<T>;
};

