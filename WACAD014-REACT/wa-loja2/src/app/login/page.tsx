'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

type LoginForm = {
    email: string
    password: string
}

export default function Login() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>()

    const submitLogin = () => {
        router.push('/')
    }

    return (
        <main>
            <div className='container-fluid d-flex min-vh-100'>
                <div className='row min-vw-100'>
                    <div className='col-12 col-md-4 bg-light d-flex justify-content-center align-items-center'>
                        <h2>Bem vindo à WA Loja!</h2>
                    </div>{' '}
                    <div className='col-12 col-md-8 d-flex justify-content-center align-items-center'>
                        <form onSubmit={handleSubmit(submitLogin)}>
                            <div className='mb-3'>
                                <label htmlFor='email' className='form-label'>
                                    Email
                                </label>
                                <input
                                    type='email'
                                    className='form-control form-control-lg'
                                    id='email'
                                    aria-describedby='email'
                                    {...register('email', {
                                        required: 'email obrigatorio',
                                    })}
                                />
                                {errors.email && (
                                    <span className='text-danger small'>
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>
                            <div className='mb-3'>
                                <label htmlFor='password' className='form-label'>
                                    Senha
                                </label>
                                <input
                                    type='password'
                                    className='form-control form-control-lg'
                                    id='password'
                                    {...register('password', {
                                        required: 'senha obrigatoria',
                                        minLength: {
                                            value: 6,
                                            message: 'a senha dev ter no minimo 6 caracters',
                                        },
                                    })}
                                />
                                {errors.password && (
                                    <span className='text-danger small'>
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>

                            <div className='d-grid col-12'>
                                <button type='submit' className='btn btn-success'>
                                    Entrar
                                </button>
                            </div>

                            <div className='text-center mt-3'>
                                <Link href='/register' className='btn btn-link'>
                                    não tenho cadastro
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
