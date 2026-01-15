import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";
import { rateLimit } from "@/lib/rate-limit";

export async function middleware(request: NextRequest) {
    // Get client IP for rate limiting (x-forwarded-for is set by Vercel/proxies)
    const ip = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "127.0.0.1";

    // Apply rate limiting
    const { success, remaining, resetTime } = rateLimit(ip);

    if (!success) {
        return new NextResponse("Too Many Requests", {
            status: 429,
            headers: {
                "Retry-After": String(Math.ceil((resetTime - Date.now()) / 1000)),
                "X-RateLimit-Limit": "30",
                "X-RateLimit-Remaining": "0",
                "X-RateLimit-Reset": String(resetTime),
            },
        });
    }

    // Update session and add rate limit headers
    const response = await updateSession(request);

    // Add rate limit headers to successful responses
    response.headers.set("X-RateLimit-Limit", "30");
    response.headers.set("X-RateLimit-Remaining", String(remaining));
    response.headers.set("X-RateLimit-Reset", String(resetTime));

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
