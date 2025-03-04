import { type NextRequest, NextResponse } from "next/server";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// Generic type for Request
type RequestType = NextRequest;
type ResponseType = NextResponse;

// Generic RouteHandler type
type RouteHandler<TReq extends RequestType, TRes extends ResponseType> = (
	req: TReq,
) => Promise<TRes>;

type ProtectionConfig<TReq extends RequestType, TRes extends ResponseType> = {
	handler: RouteHandler<TReq, TRes>;
	token?: string;
};

type ProtectedRoute<
	TReq extends RequestType,
	TRes extends ResponseType,
	M extends HttpMethod,
> = {
	[key in M]: RouteHandler<TReq, TRes>;
};

export const withProtection = <
	TReq extends RequestType,
	TRes extends ResponseType,
	M extends HttpMethod,
>({
	method,
	handler,
	token,
}: ProtectionConfig<TReq, TRes> & { method: M }): ProtectedRoute<
	TReq,
	TRes,
	M
> => {
	const protectedHandler = async (req: TReq): Promise<TRes> => {
		try {
			// Verify method
			if (req.method !== method) {
				return NextResponse.json(
					{ error: `Method ${req.method} not allowed` },
					{ status: 405 },
				) as TRes;
			}

			// Get authorization header from request
			const authorization = req.headers.get("authorization");

			if (!authorization) {
				return NextResponse.json(
					{ error: "Authorization header missing" },
					{ status: 401 },
				) as TRes;
			}

			// Check if token matches
			const providedToken = authorization.replace("Bearer ", "");
			if (providedToken !== token) {
				return NextResponse.json(
					{ error: "Invalid authorization token" },
					{ status: 403 },
				) as TRes;
			}

			// If authorized, call the original handler
			return handler(req);
		} catch (error) {
			// biome-ignore lint/suspicious/noConsole: Valid use case
			console.error("Error in protected route:", error);
			return NextResponse.json(
				{ error: "Internal server error" },
				{ status: 500 },
			) as TRes;
		}
	};

	// Return an object with the method as key and protected handler as value
	return {
		[method]: protectedHandler,
	} as ProtectedRoute<TReq, TRes, M>;
};
