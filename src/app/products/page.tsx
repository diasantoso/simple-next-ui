"use client";
import React,{useEffect, useState} from "react";
import useSWR from "swr";
import { fetcher } from "../libs";
import Product from "../components/product";
import {ProductModel} from "../types";

export default function Products() {
    const [products, setProducts] = useState<ProductModel[]>([]);
    const { data, error, isLoading } = useSWR<any>(`/api`, fetcher);
    useEffect(()=>{
        if(data && data.result.products) {
            setProducts(data.result.products);
        }
    }, [data,isLoading]);
    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;
    if (!data) return null;

    const searchProductsByTitle = (title : String) => {
        setProducts(data.result.products);
        if (!title || title === '') return
        setProducts(products.filter((product: ProductModel) =>
            product.title.includes(String(title))));
    }

    const searchProductsByCategory = (category: String) => {
        if (!category || category === '') return
        setProducts(data.result.products.filter((product: ProductModel) =>
            product.category === category));
    }

    const getCategories = () => {
        const result = data.result.products.map((data: ProductModel) => data.category);
        return [...new Set(result)];
    }

    return (
        <div className="w-full max-w-7xl m-auto mb-20">
            <div className="caption-top py-5 font-bold text-2xl text-center">
                List of Products
            </div>
            <div className="flex-wrap mb-10">
                <input
                    type="text"
                    name="title"
                    placeholder="Search by title"
                    className="border-[1px] border-gray-500 p-2 rounded-sm mr-5 outline-none"
                    onChange={(e:any)=> searchProductsByTitle(e.target.value)}
                />
                <select
                    name="category"
                    aria-placeholder="Search by category"
                    className="border-[1px] border-gray-500 p-2 rounded-sm outline-none"
                    onChange={(e:any)=> searchProductsByCategory(e.target.value)}
                >
                    {
                        getCategories().map((item: any) =><option key={item} value={item}>{item}</option>)
                    }
                </select>
            </div>
            <table className="w-full border-collapse border">
                <thead>
                <tr className="text-center">
                    <th className="border p-1">ID</th>
                    <th className="border p-1">Title</th>
                    <th className="border p-1">Category</th>
                    <th className="border p-1">Price</th>
                    <th className="border p-1">Rating</th>
                    <th className="border p-1">Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    products && products.map((item : ProductModel)=><Product key={item.id} {...item} />)
                }
                </tbody>
            </table>
        </div>
    );
}