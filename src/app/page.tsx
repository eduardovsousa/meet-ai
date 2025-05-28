"use client"

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const {
    data: session
  } = authClient.useSession()

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      name,
      password
    }, {
      onError: (ctx) => {
        alert(ctx.error.message);
      },
      onSuccess: (ctx) => {
        alert(ctx.response.ok);
      },
    })
  }

  const onLogin = () => {
    authClient.signIn.email({
      email,
      password
    }, {
      onError: (ctx) => {
        alert(ctx.error.message);
      },
      onSuccess: (ctx) => {
        alert(ctx.response.ok);
      },
    })
  }

  if (session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>
          Sign out
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-10">
      <div className="p-4 flex flex-col gap-y-4">
        <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />

        <Button onClick={onSubmit}>
          Create user
        </Button>
      </div>
      <div className="p-4 flex flex-col gap-y-4">
        <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />

        <Button onClick={onLogin}>
          Login
        </Button>
      </div>
    </div>
  )
}
