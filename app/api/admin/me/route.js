import { getAdminFromCookie } from "../../../../lib/serverAuth";

export async function GET() {
  const admin = await getAdminFromCookie();
  if (!admin) {
    return Response.json({ authenticated: false }, { status: 401 });
  }
  return Response.json({
    authenticated: true,
    email: admin.email,
    loginAt: admin.iat ? new Date(admin.iat * 1000).toISOString() : null,
  });
}
