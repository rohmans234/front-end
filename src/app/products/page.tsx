import Link from "next/link"

export default function Page(){
    const products =["topi", "baju" , "celana"]
    return(
        <div>
            {products.map ((item, idx) => {
                return(
                    <div>
                        <Link href={`/products/${item}`}>{item}</Link>
                    </div>
                )
            })}

        </div>
    );
}