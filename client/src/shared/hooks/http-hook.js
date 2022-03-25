import { useState, useCallback, useRef, useEffect } from "react"
import LoadingSpinner from "../components/UIElements/LoadingSpinner"
import ErrorModal from "../components/UIElements/ErrorModal"

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const activeHttpRequests = useRef([])

    const sendRequest = useCallback(async (
        url,
        method = "GET",
        body = null,
        headers = {},
        signal = httpAbortCtrl.signal
    ) => {
        setIsLoading(true)
        const httpAbortCtrl = new AbortController()
        activeHttpRequests.current.push(httpAbortCtrl)
        try {
            const response = await fetch(url, {
                method: method,
                body: body,
                headers: headers
            })
            const responseData = await response.json()

            if (!response.ok) {
                throw new Error(responseData.message)
            }
            return responseData
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }, [])
    const clearError = () => {
        setError(null)
    }
    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abortCtrl().abort())
        } ;
    }, [])

    return {
        isLoading: isLoading,
        error: error,
        sendRequest: sendRequest,
        clearError: clearError
    }
}