function FoodCard({ product = {} }) {
  const {
    product_name,
    brands,
    nutriments,
    image_small_url
  } = product

  return (
    <div className="food-card">
      <img
        src={image_small_url || "https://via.placeholder.com/100"}
        alt="food"
        width="100"
      />

      <h2>{product_name || "Unknown"}</h2>

      <p>Brand: {brands || "N/A"}</p>

      <p>Calories: {nutriments?.["energy-kcal_100g"] || 0}</p>
      <p>Protein: {nutriments?.proteins_100g || 0}</p>
      <p>Carbs: {nutriments?.carbohydrates_100g || 0}</p>
      <p>Fat: {nutriments?.fat_100g || 0}</p>
    </div>
  )
}

export default FoodCard