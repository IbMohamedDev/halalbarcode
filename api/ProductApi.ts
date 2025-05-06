import haramList from './haram-list.json';

export const fetchProductData = async (barcode: string) => {
  try {
    const response = await fetch(`https://world.openfoodfacts.net/api/v2/product/${barcode}.json`);
    const data = await response.json();

    if (!data.product) {
      return null;
    }

    const product = data.product;

    // Use ingredients_text_en or fallback
    const rawIngredients = product.ingredients_text_en || product.ingredients_text || '';
    const parsedIngredients = rawIngredients
      .split(',')
      .map((item: string) => item.trim().toLowerCase());

    // Match against haram list
    const haramIngredients = parsedIngredients.filter((ingredient: string | string[]) =>
      haramList.some((entry) =>
        ingredient.includes(entry.ingredient_name.toLowerCase())
      )
    );

    // Build simplified product object
    const productData = {
      product_name: product.product_name || '',
      brand: product.brands || '',
      categories: product.categories_tags || [],
      isHaram: haramIngredients.length > 0,
      haramIngredients,
      fullIngredients: parsedIngredients,
      image_url: product.image_url || '',
      countries: product.countries || '',
      stores: product.store_tags || '',
      product_type: product.product_type || '',
      barcode: product.code || ''
    };

    return productData;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};


// const styles = StyleSheet.create({})


