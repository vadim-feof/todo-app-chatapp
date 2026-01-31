import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/styles/globals.css";
import { AddTodoDialog } from "@features/add-todo";
import StoreProvider from "@app/providers/store-provider";
import { EditTodoDialog } from "@features/edit-todo/ui/dialog";
import { InitTodos } from "@/features/persist-todo";

const inter = Inter({
    variable: "--font-inter-sans",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    title: "Todo List - Тестовое задание ChatApp",
    description: "Todo List с использованием React и Redux Toolkit",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ru">
        <body className={`${inter.variable} antialiased`}>
        <StoreProvider>
            {children}
            <InitTodos/>
            <AddTodoDialog/>
            <EditTodoDialog/>
        </StoreProvider>
        </body>
        </html>
    );
}
