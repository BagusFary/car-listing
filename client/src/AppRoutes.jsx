import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/Layout";
import { ListPage } from "./pages/Car/ListPage";
import { CreatePage } from "./pages/Car/CreatePage";


export const router = createBrowserRouter([

    {
        path: '/',
        Component: Layout,
        children:[
            {
                path: '',
                Component: ListPage
            },
            {
                path: '/create',
                Component: CreatePage
            }
        ]
    }
    
]);
