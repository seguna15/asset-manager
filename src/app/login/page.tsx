import LoginButton from "@/components/auth/login-button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import {  Package } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(session) redirect("/")
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Card className="max-w-md w-full shadow">
            <CardHeader className="text-center">
                <div className="mx-auto p-2 rounded-full bg-teal-500">
                    <Package className="h-6 w-6 text-white"></Package>
                </div>
                <CardTitle className="text-2xl font-bold text-teal-600">
                    Welcome Back
                </CardTitle>
                <CardDescription className="text-slate-600">
                    Sign in to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <LoginButton/>
            </CardContent>

            <CardFooter className="flex justify-center">
                <Link href="/" className="text-sm text-slate-500 hover:text-teal-600">Back to home</Link>
            </CardFooter>
        </Card>

    </div>
  )
}
