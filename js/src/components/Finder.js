import { useState, useEffect } from "react";

import products, { categories } from "../products";
import FilterForm from "./FilterForm";
import ProductsList from "./ProductsList";

import FilterStatus from "./FilterStatus";

export default function Finder() {
  const [saleOnly, setSaleOnly] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);

  //Titel anpassen, ruft finder neu auf bei jedem change der dependencies, dependcies (Abhängigkeiten)
  //1
  useEffect(
    () =>
      (document.title = `Suche: ${keyword} ${
        saleOnly ? "im Sonderangebot" : ""
      }`),
    [keyword, saleOnly]
  );

  //flackern verhindern, vorladen
  const [loading, setLoading] = useState(true);

  //Inhalte aus URL laden
  //Um category ersetzen, achtung int!
  //2
  useEffect(() => {
    //aktuelle url auslesen
    const url = new URL(window.location.href);

    const oldKeyword = url.searchParams.get("keyword");
    if (oldKeyword) {
      setKeyword(oldKeyword);
      //mitgegebenes Keyword als inputsetzen
      //Achtung wird immer wieder ausgeführt >> leeres dependenciesarray setzen!
    }

    const oldCategory = url.searchParams.get("category");
    if (oldCategory) {
      setSelectedCategory(parseInt(oldCategory));
      //alles in der Url ist string! daher parseInt!
    }

    const oldSale = url.searchParams.get("sale");
    if (oldSale === "true") {
      setSaleOnly(true);
    }

    // "ladevorgang" ist beendet
    setLoading(false);
    //leerer Depency-Array sorgt dafür. dass diese Funktion nur einmal nach der ersten Darstellung ausgeführt wird
  }, []);

  //urls manipulieren
  // url: window.location
  // window.location.href enthält exakte url der seite
  //3
  useEffect(() => {
    //konstruiere ein enues URL-Obj auf Grundlager der aktuellen Url
    const url = new URL(window.location.href);

    //keayword reseten, entfernt evtl keyword parameter
    url.searchParams.delete("keyword");
    //falls keyword nicht leer ist, füge den keyword-parameter hinzu
    if (keyword) {
      url.searchParams.set("keyword", keyword);
      //searchParams = teil der url nach dem ? zb Position des yt videos, suchbegriff etc
    }

    url.searchParams.delete("keywords");
    if (selectedCategory) {
      url.searchParams.set("category", selectedCategory); //category steht im URL
    }
    console.log(url);
    //
    window.history.replaceState({}, "", url);
    //history ändert broswerverlauf: vorwärts rückwärts navigieren über js
    // window.history.back() . springt eine Seite zurück im verlauf
    //replaceState(): ersetzt aktuelle url: 1 obj,2 string ,3 eigentlich wert

    //alternativ window.history.pushState >> eigt jede einzelne Zwischenschritt: Eingabe von bchstaben
  }, [keyword, selectedCategory]);

  //???
  if (loading) {
    return null; //keine Ausgabe
  } //bis alte url ausgewertet = when erster useEffect abgearbeitet seturl s.oben

  /* Gebe alle Produkte in die Filterfunktion und erhalte
  nur die zurück, die den aktuellen Filtereinstellungen entsprechen. */
  const filteredProducts = getFilteredProducts(
    products,
    saleOnly,
    keyword,
    selectedCategory
  );

  /* 
    1. Erstellt eine Komponente FilterStatus, die die Anzahl der gefilterten
    Produkte darstellt. Also "x Produkte gefunden". Die Komponente soll zwischen
    Filter und Produktliste dargestellt werden.
    Die Anzeige soll in einem div mit der Klasse "filter-status" erscheinen.
    2. Die Komponente soll Kein Produkt / Ein Produkt / x Produkte gefunden...
    ausgeben.
    3. Bonus: Wenn KEIN Produkt gefunden wurde, soll der Text z.B. in rot
    erscheinen. Das div soll zusätzlich die Klasse "filter-status--no-results" haben.
    */

  /* 
    2. Die Komponente soll Kein Produkt / Ein Produkt / x Produkte gefunden...
    ausgeben. //3 möglichkeiten asuhwal switch/case?
    3. Bonus: Wenn KEIN Produkt gefunden wurde, soll der Text z.B. in rot
    erscheinen. className="filter-status", filter-status--no-results
    */

  return (
    <div className="shop">
      <FilterForm
        saleOnly={saleOnly}
        setSaleOnly={setSaleOnly}
        keyword={keyword}
        setKeyword={setKeyword}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        // keine abkürzung für diese Schreibweise?
      />
      {/* //Filterstatus */}
      <FilterStatus count={filteredProducts.length} />
      {/* filtered.lenght hätte gereicht */}
      <ProductsList products={filteredProducts} />
    </div>
  );
}

function getFilteredProducts(products, saleOnly, keyword, selectedCategory) {
  /* Speichere die Information, ob der Filter NICHT aktiv ist */
  const noSaleFilter = !saleOnly;
  const noKeywordFilter = keyword.length <= 1; //mind 1 Buchstabe; bzw erst aktiv, wenn bestimmte anzahl an buchstaben eingegeben sind
  const noCategoryFilter = selectedCategory === 0; //0==alleKategorien

  /*   Regulärer Ausdruck, um zu testen, ob ein Muster in einem
  anderen String vorkommt. "i" bedeutet "case insensitive",
  also Großschreibung ignorieren.
  Das RegExp-Objekt hat u.a. die Methode test(), um zu prüfen, ob ein String
  die Bedingungen des regulären Ausdrucks erfüllt.
  https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/RegExp */
  const keywordRegExp = new RegExp(keyword, "i"); //suchmuster wo ist zeichenfolge
  //i = caseinsensitiv klein/groß egal, suche in keyword,caseinsentive

  const filteredProducts = products
    .filter(
      /* Entweder der Filter ist nicht aktiv, dann wird für alle
      Produkte true zurückgegeben, und es kommen entspechend
      alle durch den Filter. Andernfalls nur die, bei denen
      product.sale true ist */
      (product) => noSaleFilter || product.sale
    ) //Ergebnis filter 1 = array >> chaining. weitere methoden anhängen
    .filter((product) => noKeywordFilter || keywordRegExp.test(product.title))
    //test prüft, ob string den kritereien genügt
    .filter(
      (product) => noCategoryFilter || selectedCategory === product.category
    );

  //oder Prüfung:
  return filteredProducts;
}

// import { useState } from "react";

// import products from "../products";
// import FilterForm from "./FilterForm";
// import ProductsList from "./ProductsList";

// export default function Finder() {
//   const [saleOnly, setSaleOnly] = useState(false);

//   const filteredProducts = getFilteredProducts(products, saleOnly);

//   return (
//     <div className="shop">
//       <FilterForm saleOnly={saleOnly} setSaleOnly={setSaleOnly} />
//       <ProductsList products={filteredProducts} />
//     </div>
//   );
// }

// function getFilteredProducts(products, saleOnly) {
//   const noSaleFilter = !saleOnly; //True = nciht aktiv

//   const filteredProducts = products.filter(
//     (product) => noSaleFilter || product.sale === saleOnly //entweder es gibt keinen saleFilter, oder alle Prodcukte die im sale
//   );

//   return filteredProducts;
// }
