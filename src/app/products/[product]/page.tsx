export default async function Page({params}: {params: Promise<{ product: string}>}){
    const { product} = await params
    return(
        <div className="px-20">
            <h2 className="text-3xl">ini page untuk product {product}</h2>
        </div>
    )
}