import { getProductsById } from '@/helpers/product.helper'
import ProductDetail from '@/views/ProductDetail/ProductDetail'


const Detail = async ({params}: {params: {productId: string}}) => {
  const product = await getProductsById(params.productId)
  return (
    <ProductDetail {...product} />
  )
}

export default Detail