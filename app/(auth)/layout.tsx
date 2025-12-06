const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-black mx-auto flex items-center justify-center">
      <div className="max-w-md w-full">
        {children}
      </div>
    </div>
  )
}
export default AuthLayout