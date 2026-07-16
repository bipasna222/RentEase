export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-black">
          Login
        </h1>

        <form>
          <div className="mb-4">
            <label className="text-black">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full rounded border p-2 text-black"
            />
          </div>

          <div className="mb-4">
            <label className="text-black">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="mt-1 w-full rounded border p-2 text-black placeholder:text-gray-400"
            />
          </div>

          <button
            className="w-full rounded bg-blue-600 p-2 text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}