import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value
  if (localeCookie !== undefined && request.nextUrl.locale !== localeCookie) {
    console.log(
      new URL(`/${localeCookie}/${request.nextUrl.pathname}`, request.url).href
    )
    return NextResponse.redirect(
      new URL(
        `/${localeCookie}${request.nextUrl.pathname}`,
        request.url
      ).href.toString()
    )
  }
}
export const config = {
  matcher: ["/", "/home"], // paths on which middleware will work
}
