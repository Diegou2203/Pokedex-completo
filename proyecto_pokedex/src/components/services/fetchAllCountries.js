
      export const fetchAllCountries = async () => {
      const res = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags");
      if (!res.ok) throw new Error("No se pudieron obtener los países");
      return await res.json();
      };

      export const fetchOneCountry = async (name) => {
      const encodedName = encodeURIComponent(name);
      const res = await fetch(`https://restcountries.com/v3.1/name/${encodedName}`);
      if (!res.ok) throw new Error("No se pudo obtener el país");
      return await res.json();
      };

