/* 
    
    2. Die Komponente soll Kein Produkt / Ein Produkt / x Produkte gefunden...
    ausgeben.
    3. Bonus: Wenn KEIN Produkt gefunden wurde, soll der Text z.B. in rot
    erscheinen. Das div soll zusätzlich die Klasse "filter-status--no-results" haben.
    
    */

//mein Ansatz
// export default function FilterStatus({ count }) {
//   //pcount = products,length
//   //console.log(products.length);
//   console.log(products);
//   const produkteGefunden = count > 0;

//   const cssClasses = `filter-status ${
//     !produkteGefunden ? "filter-status--no-results" : ""
//   }`;

//   const ausgabe = `${products.length} Produkte gefunden`;

//   return (
//     <div className="filter-status">
//       {produkteGefunden ? ausgabe : "Keine Produkte gefunden"}
//     </div>
//   );
// }

export default function FilterStatus({ count }) {
  const noProductsFound = count === 0;
  const cssClasses = `filter-status ${
    noProductsFound ? "filter-status--no-results" : ""
  }`;

  return <div className={cssClasses}>{getStatusText(count)}</div>;
}

function getStatusText(count) {
  switch (count) {
    case 0:
      return "Kein Produkt gefunden"; //break überflüssig wegen return!

    case 1:
      return "Ein Produkt gefunden";

    default:
      return `${count} Produkte gefunden`;

    //case >1 bedingungen gehen auch
  }
}
var x = "ok";
