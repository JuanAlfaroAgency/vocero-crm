import { LoginForm } from "@/components/auth/login-form";
import { isPublicSignupAllowed } from "@/server/auth/registration";

// Se decide en cada request: el registro se cierra en cuanto nace la
// organización, y en el build no hay base de datos que consultar.
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  // Sin base de datos no se ofrece el registro: fallar cerrado.
  const signupOpen = await isPublicSignupAllowed().catch(() => false);
  return <LoginForm signupOpen={signupOpen} />;
}
