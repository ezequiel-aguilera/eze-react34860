import React from 'react';
import { useParams } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync'
import { useTitle } from '../hooks/useTitle'
import ItemList from './ItemList';
import { getProducts } from '../services/firebase/firestore/products'


const ItemListContainer = ({ greeting }) => {
    useTitle('Servicios filtrados', [])

    const { categoryId } = useParams()

    const getProductsWithCategory = () => getProducts(categoryId)

    const { data: products, error, loading } = useAsync(getProductsWithCategory, [categoryId])


    if (loading) {
        return (

                <h1 className='py-40 text-center font-bold text-white bg-[#000211] h-[650px]'>Cargando servicios...</h1>


        )
    }

    if (error) {
        return <h1 className='py-40 text-center font-bold text-white bg-[#000211] h-[650px]'>Hubo un error al cargar los productos</h1>
    }

    return (
        <div className='bg-[#000211]'>
            <div className='md:w-[1200px] h-full flex flex-col justify-center align-center mx-auto py-40'>
                <h1 className='text-3xl text-white font-bold mx-auto'>{greeting}</h1>
                <ItemList products={products} className='' />
            </div>
        </div>
    )
}

export default ItemListContainer;