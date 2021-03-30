import { categories } from "../products";

//console.log(categories);

export default function FilterForm({
  saleOnly,
  setSaleOnly,
  keyword,
  setKeyword,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <form className="filter" onSubmit={(e) => e.preventDefault()}>
      {/* Unterbinde Standardverhalten onSubmit, beim absenden */}
      <div className="filter__search">
        <label htmlFor="keyword">Suchbegriff</label>
        <div>
          <input
            type="text" //type seach fügt bei manchen browsern automatisch xbtn ein!
            id="keyword"
            //autocomplete:off (ss)
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            onClick={() => setKeyword("")}
            aria-label="Suchbgefriff löschen" //barrierefrei
            type="button" //Neuladen verhindern teil1
            disabled={keyword === ""} //wenn Feld leer, deaktiviert
          >
            &times;
          </button>
        </div>
      </div>
      <label>
        <input
          type="checkbox"
          checked={saleOnly}
          onChange={(e) => {
            setSaleOnly(e.target.checked);
          }}
        />
        Sonderangebote
      </label>

      <div className="filter__category">
        {/* //1. Verknüpft das select-Menü mit einem Label "Kategorie"
        2. Importiert die anderen Kategorien aus products.js
        //3. Nutzt die Map-Methode, um nach der ersten option die
        weiteren option-Elemente zu erzeugen.
        //4. Erstellt in Finder.js den state selectedCategory und
        gebt ihn samt set-Funktion in FilterForm.
        5. Verknüpft den state und die set-Funktion mit dem 
        select-Element, ähnlich wie bei dem text-Input.
        6. Ergänzt in Finder.js die getFilteredProducts-Funktion
        um den selectedCategory-Filter. Beachtet, dass der ausgelesene
        value des select-Elements immer ein String ist, und nutzt
        parseInt, um ihn in einen Integer umzuwandeln. */}
        <label htmlFor="category">Kategorie</label>

        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
        >
          <option value="0">Alle Kategorien</option>
          {categories.map(({ name, categoryId: id }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
