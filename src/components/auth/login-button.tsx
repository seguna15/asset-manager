"use client"

import { Button } from "../ui/button"

function LoginButton(){
    return (
        <Button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-6 font-medium">
            <span>Sign in with Google</span>
        </Button>
    )
}

export default LoginButton;