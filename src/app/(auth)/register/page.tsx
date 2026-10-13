import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { isPublicSignupAllowed } from "@/server/auth/registration";

// Se decide en cada request: el registro se cierra en cuanto nace la
// organización, y en el build no hay base de datos que consultar.
export const dynamic = "force-dynamic";

/**
 * Con la organización ya creada (FR-060) no se enseña un formulario que el
 * servidor va a rechazar: se dice de entrada que el registro está cerrado.
 * El 403 de `/sign-up/email` sigue siendo la puerta real.
 */
export default async function RegisterPage() {
  // Sin base de datos no se ofrece el registro: fallar cerrado.
  const signupOpen = await isPublicSignupAllowed().catch(() => false);
  if (signupOpen) return <RegisterForm />;

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>El registro está cerrado</CardTitle>
        <CardDescription>
          Esta instancia ya tiene su organización. Pide acceso al propietario.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-sm text-muted-foreground">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Inicia sesión
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
