import Product from "./Product";
/* 1. importiert Product
2. Nutzt die map-Methode von products,um innerhalb der section
alle Produkte im Array auszugeben.
*/
export default function ProductsList({ products }) {
  return (
    <section className="products">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </section>
  );
}

/*//Alternative Lösung testen.
//Sinnvoller in Einzelkomponente, falls anderswo der Snippet wiederverwendet werdne muss

export default function ProductsList() {
    return 
  products.map((product) => <Product key={product.id} {...product} />);

  //warum geht das nicht direkt hier!??
  /* <section className="products">
      {products.map(({ id, title, image, price, category, sale }) => {
       
        
          <article class="product" key={id}> //oberstes Element
            <div class="product__image">{image}</div>
            <h3 class="product__heading">{title}</h3>
            <p class="product__price">{price}</p>
          </article>
        
      })}
    </section>
    
   
}*/
