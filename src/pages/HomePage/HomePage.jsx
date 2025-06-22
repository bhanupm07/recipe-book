import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiKey, serverUrl } from "../../utils/data";

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Fetch recipes from API
  const fetchRecipesData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${serverUrl}/complexSearch?apiKey=${apiKey}&number=50&addRecipeNutrition=false&addRecipeInformation=true`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch recipes!");
      const data = await res.json();
      setRecipes(data.results);
      setFilteredRecipes(data.results); // Initialize filtered list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipesData();
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  return (
    <div className="p-6 mx-auto pb-28">
      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for recipes..."
          className="w-full md:w-1/2 mx-auto block px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Loader */}
      {loading && (
        <div className="flex flex-col justify-center items-center my-6 h-[calc(100vh-100px)]">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 mb-3"></div>
          <p className="text-blue-500 mt-2">Loading recipes....</p>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-40">{error}</p>}

      {/* Recipes List */}
      {!loading && filteredRecipes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 md:px-16">
          {filteredRecipes.map((recipe) => (
            <Link
              to={`/recipe/${recipe.id}`}
              key={recipe.id}
              className="border bg-white rounded-lg shadow-md p-4 text-center cursor-pointer hover:shadow-2xl flex flex-col justify-between"
            >
              <div>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-40 md:h-80 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
                <p className="text-sm text-gray-600 mb-2">
                  Ready in {recipe.readyInMinutes} minutes | Servings:{" "}
                  {recipe.servings}
                </p>
                <p className="text-sm text-green-600 mb-2">
                  {recipe.veryHealthy ? "Healthy |" : ""}{" "}
                  {recipe.vegetarian ? "Vegetarian |" : ""}{" "}
                  {recipe.glutenFree ? "Gluten Free" : ""}
                </p>
              </div>
              <a
                href={recipe.sourceUrl}
                className="text-blue-500 font-medium hover:underline"
              >
                View Details
              </a>
            </Link>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && filteredRecipes.length === 0 && (
        <p className="text-center text-gray-500">No recipes found.</p>
      )}
    </div>
  );
}

export default HomePage;
