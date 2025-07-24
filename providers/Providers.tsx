"use client"
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
    // const [queryClient] = useState(() => new QueryClient());
    return <>
        <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={true}>
            <Toaster richColors position="top-center" />
            {/* <QueryClientProvider client={queryClient}> */}
            {children}
            {/* </QueryClientProvider> */}
        </NextThemesProvider>

    </>


}