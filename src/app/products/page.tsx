// src/app/products/page.tsx
import Link from "next/link"

export default function Page(){
    const products =["topi", "baju" , "celana"]
    return(
        <div>
            {products.map ((item, _idx) => { // Add underscore to 'idx'
                return(
                    <div key={_idx}> // Add key prop
                        <Link href={`/products/${item}`}>{item}</Link>
                    </div>
                )
            })}
        </div>
    );
}