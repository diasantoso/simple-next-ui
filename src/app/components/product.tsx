import React from 'react'
import { ProductModel } from '../types'
import Link from 'next/link'

export default function Product(params: ProductModel) {
    return (
        <tr>
            <td className='w-10 border p-1 text-center'>{params.id}</td>
            <td className='border p-1'>{params.title}</td>
            <td className='border p-1'>{params.category}</td>
            <td className='border p-1'>{params.price}</td>
            <td className='border p-1'>{params.rating}</td>
            <td className='border p-1'>
                <Link href={`/products/${params.id}`} className='bg-yellow-500 p-2 inline-block ml-3 text-white text-sm'>See Detail</Link>
            </td>
        </tr>
    )
}