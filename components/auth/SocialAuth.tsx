import React from 'react'
import { Button } from '../ui/button'
import { FaFacebook, FaGoogle } from 'react-icons/fa'

const SocialAuth = () => {
  return (
    <div className='flex w-full flex-col gap-2'>
        <Button variant="ghost">
            <span className='text-red-500'>
                <FaGoogle />
            </span>
            Continue with Google
        </Button>
        <Button variant="ghost">
            <span className='text-blue-500'>
                <FaFacebook />
            </span>
            Continue with Facebook
        </Button>
    </div>
  )
}

export default SocialAuth