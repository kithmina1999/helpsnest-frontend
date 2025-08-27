import React from 'react'

interface LayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({children}:LayoutProps) => {
  return (
    <main className='min-h-[100vh]'>
        {children}
    </main>
  )
}

export default AuthLayout