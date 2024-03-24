import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
  return (
    <div
        className='h-full w-full flex flex-col justify-center items-center text-muted-foreground space-y-4 '>

        <h1 className='text-4xl '>404</h1>
        <p>
            We couldn&apos;t find the user you were looking for.
        </p>
        <Button variant="secondary" asChild>

            <Link href="/">

                Go back home
            </Link>
        </Button>
    
    
    </div>


  )
}

export default NotFoundPage