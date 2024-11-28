'use client'

import { registerUser } from '@/actions';
import { login } from '@/actions/auth/login';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type FormInputs = {
    name: string
    email: string
    password: string;

}

export const RegisterForm = () => {

    const [errorMessage, setErrorMessage] = useState('second')

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit = async (data: FormInputs) => {

        const { name, email, password } = data

        const resp = await registerUser(name, email, password)

        if (!resp.ok) {
            setErrorMessage(resp.message)
        }

        await login(email.toLowerCase(), password)
        window.location.replace('/');
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col">


            <label htmlFor="email">Nombre Completo</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5"
                        , {
                            ' border-red-500': errors.name
                        }
                    )
                }
                type="text"
                autoFocus
                {...register('name', { required: true })}
            />


            <label htmlFor="email">Email</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5"
                        , {
                            ' border-red-500': errors.email
                        }
                    )
                }
                type="email"
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
            <label htmlFor="email">Contraseña</label>
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5"
                        , {
                            ' border-red-500': errors.password
                        }
                    )
                }
                type="password"
                {...register('password', { required: true, minLength: 4 })}
            />

            <span className='text-red-500'>{errorMessage}</span>

            <button className="btn-primary">Crear Cuenta </button>

            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/new-account"
                className="btn-secondary text-center">
                Ingresar
            </Link>

        </form>
    )
}
