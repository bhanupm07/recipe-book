import { useEffect, useState } from "react";
import { apiKey, serverUrl } from "../../../utils/data";
import { useParams } from "react-router-dom";

const SimpleRecipes = () => {
  const [similarRecipes, setSimilarRecipes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const params = useParams();

  const fetchSimilarRecipes = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${serverUrl}/${params.id}/similar?apiKey=${apiKey}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setSimilarRecipes(data);
        console.log(data);
      } else {
        throw new Error("Couldn't fetch information");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSimilarRecipes();
  }, []);

  return (
    <div className="mt-16 pb-28">
      <h2 className="text-3xl font-semibold text-gray-900">Similar Recipes</h2>
      {loading ? (
        <p className="text-gray-700 mt-4">Loading similar recipes...</p>
      ) : similarRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {similarRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="border bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={`https://spoonacular.com/recipeImages/${recipe.id}-312x231.${recipe.imageType}`}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-4">{recipe.title}</h3>
              <p className="text-gray-600 mt-2">
                Ready in: {recipe.readyInMinutes} minutes
              </p>
              <p className="text-gray-600">Servings: {recipe.servings}</p>
              <a
                href={recipe.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-4 inline-block"
              >
                View Recipe
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700 mt-4">{error}</p>
      )}
    </div>
  );
};

export default SimpleRecipes;
