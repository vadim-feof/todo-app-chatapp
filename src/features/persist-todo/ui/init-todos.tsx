'use client'
import { useEffect } from "react";
import { useAppStore } from "@shared/lib/hooks/use-app-store";
import { persistStore } from "redux-persist";
import { useAppDispatch } from "@shared/lib/hooks/use-app-dispatch";
import { init } from "../model/slice";

export const InitTodos = () => {
    const store = useAppStore()
    const dispatch = useAppDispatch()

    useEffect(() => {
        persistStore(store)
        dispatch(init())
    }, [])

    return null
}
