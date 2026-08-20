"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/actions/auth-actions";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(loginAction, undefined);

  return (
    <form action={formAction} className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Admin Login</h1>

      <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        autoFocus
        className="mb-4 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none"
      />

      {state?.error && (
        <p className="mb-4 text-sm text-red-600">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
