import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server'

export const middleware = async (request: NextRequest) => {

    const token = await getToken({ req: request });
    const path = request.nextUrl.pathname;

    if (!token) {
        if (path.startsWith('/admin'))
            return NextResponse.redirect(new URL('/login', request.url))
    
        if (path.startsWith('/subscription'))
            return NextResponse.redirect(new URL('/login', request.url))
    }

    if (token) {
        if (path.startsWith('/login') || path.startsWith('/sign-up'))
            return NextResponse.redirect(new URL('/', request.url))

        const isAdmin = token.isAdmin;
        if (!isAdmin && path.startsWith('/admin'))
            return NextResponse.redirect(new URL('/', request.url))

        if (path === '/admin')
            return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }

    return NextResponse.next()

}


export const config = {
    matcher: [
        '/',
        '/login',
        '/sign-up',
        '/admin/:path*',
        '/subscription/'
    ]
}
