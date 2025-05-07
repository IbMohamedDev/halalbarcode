export const fetchProductData = async (barcode: string) => {
  if (!/^\d{8,14}$/.test(barcode)) {
    throw new Error('Invalid barcode format');
  }

  try {
    const response = await fetch(`http://192.168.0.103:3001/product/${barcode}`);
    console.log(barcode)

    if (!response.ok) {
      const errorText = await response.text();
      return null
    }
    
    const data = await response.json();
    console.log(data)
    if (!data) return null;

    console.log(data);
    return data;

  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
};


// const styles = StyleSheet.create({})


