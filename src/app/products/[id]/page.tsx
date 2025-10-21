'use client'

import React, {useEffect, useState} from "react";
import {ProductModel} from "@/app/types";
import useSWR from "swr";
import {fetcher} from "@/app/libs";
import { use } from 'react';
import Link from 'next/link'

export default function Detail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [products, setProducts] = useState<ProductModel[]>([]);
    const { data } = useSWR<any>(`/api`, fetcher);
    useEffect(()=>{
        if(data && data.result.products) {
            setProducts(data.result.products);
        }
    }, [data]);

    const getProductsById = () => {
        return products.find((product: ProductModel) => String(product.id) === id)
    }

    return (
        <div className="w-full max-w-7xl m-auto">
            <div className="caption-top py-5 font-bold text-2xl text-center">
                Product Detail
            </div>
            <div className="flex flex-wrap mb-5">
                <div className="w-32 mr-52">ID</div>
                <div className="w-96 font-bold">{getProductsById()?.id}</div>
            </div>
            <div className="flex flex-wrap mb-5">
                <div className="w-32 mr-52">Title</div>
                <div className="w-96 font-bold">{getProductsById()?.title}</div>
            </div>
            <div className="flex flex-wrap mb-5">
                <div className="w-32 mr-52">Category</div>
                <div className="w-96 font-bold">{getProductsById()?.category}</div>
            </div>
            <div className="flex flex-wrap mb-5">
                <div className="w-32 mr-52">Price</div>
                <div className="w-96 font-bold">{getProductsById()?.price}</div>
            </div>
            <div className="flex flex-wrap mb-5">
                <div className="w-32 mr-52">Rating</div>
                <div className="w-96 font-bold">{getProductsById()?.rating}</div>
            </div>
            <div className="flex flex-wrap mb-5">
                <div className="w-32 mr-52">Description</div>
                <div className="w-96 font-bold">{getProductsById()?.description}</div>
            </div>
            <Link href={`/products`} className='bg-yellow-500 p-2 inline-block text-white text-sm mt-5'>Back</Link>
        </div>
    )
}