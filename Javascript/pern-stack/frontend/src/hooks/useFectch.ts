import { useEffect, useState } from "react"

type Data<T> = T | null
type ErrorType = Error | null

interface Params<T> {
    data: Data<T> | null;
    loading: boolean;
    error: Error | null
}

export const useFetch = <T>(url: string): Params<T> => {
    const [data, setData] = useState<Data<T>>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<ErrorType>(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(url)
                const jsonData = await response.json()

                if (!response.ok) throw new Error("Error en la respuesta: " + response.statusText)

                setData(jsonData)
                setLoading(false)
            } catch (error) {
                setError(error as TypeError)
                setLoading(false)
                console.error((error as TypeError).message)
            }
        }

        fetchData()
    }, [url])

    return { data, loading, error }
}