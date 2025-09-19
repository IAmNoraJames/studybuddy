// /src/app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center bg-white px-4">
      <div className="text-center">
        <p className="text-sm font-medium text-blue-600">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Page not found</h1>
        <p className="mt-2 text-gray-600">
          The page you’re looking for doesn’t exist or was moved.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg border px-4 py-2 hover:bg-gray-50"
          >
            Go home
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Get started
          </Link>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          Need help? Check our <a href="/#faq" className="underline">FAQ</a>.
        </p>
      </div>
    </main>
  );
}
