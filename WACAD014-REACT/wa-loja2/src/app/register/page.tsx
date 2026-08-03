'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

type RegisterForm = {
    name: string
    email: string
    confirmEmail: string
    password: string
}

export default function Register() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterForm>()

    const submitRegister = () => {
        router.push('/')
    }

    return (
        <main>
            <div className='container-fluid d-flex min-vh-100'>
                <div className='row min-vw-100'>
                    <div className='col-12 col-md-4 bg-light d-flex justify-content-center align-items-center'>
                        <h2>Bem vindo à WA Loja!</h2>
                    </div>
                    <div className='col-12 col-md-8 d-flex justify-content-center align-items-center'>
                        <form onSubmit={handleSubmit(submitRegister)}>
                            <div className='mb-3'>
                                <label htmlFor='name' className='form-label'>
                                    Nome
                                </label>
                                <input
                                    type='text'
                                    className='form-control form-control-lg'
                                    id='name'
                                    aria-describedby='name'
                                    {...register('name', {
                                        required: 'nome obrigatorio',
                                    })}
                                />
                                {errors.name && (
                                    <span className='text-danger small'>
                                        {errors.name.message}
                                    </span>
                                )}
                            </div>

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
                                <label htmlFor='confirmEmail' className='form-label'>
                                    Confirmar email
                                </label>
                                <input
                                    type='email'
                                    className='form-control form-control-lg'
                                    id='confirmEmail'
                                    aria-describedby='confirmEmail'
                                    {...register('confirmEmail', {
                                        required: 'confirmacao de email necessaria',
                                    })}
                                />
                                {errors.confirmEmail && (
                                    <span className='text-danger small'>
                                        {errors.confirmEmail.message}
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
                                        required: 'Senha obrigatoria',
                                        minLength: {
                                            value: 6,
                                            message: 'a senha deve ter no minimo 6 caracters',
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
                                    Confirmar cadastro
                                </button>
                            </div>

                            <div className='text-center mt-3'>
                                <Link href='/login' className='btn btn-link'>
                                    já possuo cadastro
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}
