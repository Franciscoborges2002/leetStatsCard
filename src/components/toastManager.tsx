"use client"

import type React from "react"
import { createContext, useContext, useCallback } from "react"
import { toast, Toaster } from "sonner"


type ToastType = "loading" | "success" | "error"

interface ToastContextType {
    showToast: (type: ToastType, title: string, description?: string) => string
    updateToast: (id: string, type: ToastType, title: string, description?: string) => void
    dismissToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider2({ children }: { children: React.ReactNode }) {
    const showToast = useCallback((type: ToastType, title: string, description?: string) => {
        const id = crypto.randomUUID()
        toast[type](title, {
            description,
            id,
            duration: type === "loading" ? Infinity : 5000,
        })
        return id
    }, [])

    const updateToast = useCallback((id: string, type: ToastType, title: string, description?: string) => {
        toast.dismiss(id) // Dismiss the old one
        toast[type](title, {
            description,
            id,
            duration: type === "loading" ? Infinity : 5000,
        })
    }, [])

    const dismissToast = useCallback((id: string) => {
        toast.dismiss(id)
    }, [])

    return (
        <ToastContext.Provider value={{ showToast, updateToast, dismissToast }}>
            {children}
            <Toaster richColors />
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider")
    }
    return context
}

// Helper hook for API calls
export function useApiToast() {
    const { showToast, updateToast } = useToast()

    const apiCall = useCallback(
        async <T,>(
            fn: () => Promise<T>,
            options: {
                loading: string
                success: string
                error: string
            },
        ): Promise<T> => {
            const toastId = showToast("loading", options.loading)

            try {
                const result = await fn()
                updateToast(toastId, "success", options.success)
                return result
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : String(error)
                updateToast(toastId, "error", options.error, errorMessage)
                throw error
            }
        },
        [showToast, updateToast],
    )

    return apiCall
}