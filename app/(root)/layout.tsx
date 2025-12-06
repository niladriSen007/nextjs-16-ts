import Navbar from "@/components/web/navbar";

const RootLayout = ({ children }:
  Readonly<{ children: React.ReactNode; }>
) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
export default RootLayout