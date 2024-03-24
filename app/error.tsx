
"use client"

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const ErrorPage = () => {
  return (
    <div
        className='h-full w-full flex flex-col justify-center items-center text-muted-foreground space-y-4 '>

        
        <p>Something went wrong</p>
           
        <Button variant="secondary" asChild>

            <Link href="/">

                Go back home
            </Link>
        </Button>
    
    
    </div>


  )
}

export default ErrorPage