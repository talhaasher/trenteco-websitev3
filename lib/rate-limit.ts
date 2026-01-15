// Simple in-memory rate limiter for Next.js middleware
// For production, consider using @upstash/ratelimit with Redis

interface RateLimitStore {
    count: number;
    resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitStore>();

// Configuration
const RATE_LIMIT_WINDOW = 10 * 1000; // 10 seconds
const RATE_LIMIT_MAX_REQUESTS = 30; // 30 requests per window (increased from 10 for better UX)

/**
 * Simple in-memory rate limiter
 * @param identifier - Unique identifier (e.g., IP address)
 * @returns Object with success boolean and remaining requests
 */
export function rateLimit(identifier: string): {
    success: boolean;
    remaining: number;
    resetTime: number;
} {
    const now = Date.now();
    const record = rateLimitMap.get(identifier);

    // Clean up expired entries periodically
    if (rateLimitMap.size > 1000) {
        for (const [key, value] of rateLimitMap.entries()) {
            if (value.resetTime < now) {
                rateLimitMap.delete(key);
            }
        }
    }

    // No record or expired record - create new
    if (!record || record.resetTime < now) {
        rateLimitMap.set(identifier, {
            count: 1,
            resetTime: now + RATE_LIMIT_WINDOW,
        });
        return {
            success: true,
            remaining: RATE_LIMIT_MAX_REQUESTS - 1,
            resetTime: now + RATE_LIMIT_WINDOW,
        };
    }

    // Increment existing record
    record.count++;

    // Check if limit exceeded
    if (record.count > RATE_LIMIT_MAX_REQUESTS) {
        return {
            success: false,
            remaining: 0,
            resetTime: record.resetTime,
        };
    }

    return {
        success: true,
        remaining: RATE_LIMIT_MAX_REQUESTS - record.count,
        resetTime: record.resetTime,
    };
}
