// Type declarations for next-intl until dependencies are installed
declare module 'next-intl/server' {
  export function getTranslations(namespace?: string): Promise<(key: string) => string>;
  export function getMessages(): Promise<Record<string, any>>;
  export function getRequestConfig(config: any): any;
}

declare module 'next-intl' {
  export function useTranslations(namespace?: string): (key: string) => string;
  export function useLocale(): string;
  export class NextIntlClientProvider extends React.Component<{
    messages: Record<string, any>;
    children: React.ReactNode;
  }> {}
}

declare module 'next-intl/routing' {
  export function defineRouting(config: any): any;
  export function createNavigation(routing: any): {
    Link: any;
    redirect: any;
    usePathname: () => string;
    useRouter: () => { push: (path: string) => void; replace: (path: string) => void };
  };
}

declare module 'next-intl/middleware' {
  export default function createMiddleware(routing: any): any;
}

declare module 'next-intl/navigation' {
  export function createNavigation(routing: any): any;
}

