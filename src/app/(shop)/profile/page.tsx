
import { auth } from '@/auth.config';
import Title from '@/components/ui/title/Title'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Profilepage() {


    const session = await auth();

    if (!session?.user) {
        redirect('/')
    }

    return (
        <div>
            <Title title='Perfil' />
            <pre>{JSON.stringify(session?.user, null, 2)}</pre>
            <h3>{session.user.role}</h3>
        </div>
    )
}
