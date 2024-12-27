import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiKey, serverUrl } from "../../utils/data";
import SimpleRecipes from "./components/SimpleRecipes";

const RecipePage = () => {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const params = useParams();

  const fetchRecipeDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${serverUrl}/${params.id}/information?apiKey=${apiKey}&includeNutrition=false`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setRecipeDetails(data);
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
    fetchRecipeDetails();
  }, []);

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center my-6 h-[calc(100vh-100px)]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 mb-3"></div>
        <p className="text-blue-500 mt-2">Loading recipes...</p>
      </div>
    );
  if (error)
    return <div className="text-center text-red-500 mt-40">{error}</div>;

  const {
    image,
    title,
    summary,
    healthScore,
    servings,
    readyInMinutes,
    extendedIngredients,
    analyzedInstructions,
  } = recipeDetails;

  return (
    <div className="p-6 lg:p-12">
      <h1 className="text-5xl font-bold text-gray-900 mb-10">{title}</h1>
      <div>
        <div className="border-b border-gray-300 pb-10">
          <div className="lg:w-[70%]">
            <img
              src={image}
              alt={title}
              className="w-full h-[28rem] object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="mt-6 flex flex-wrap font-bold gap-10 text-lg">
            <div>
              <span className="font-semibold text-gray-800">
                Health Score:{" "}
              </span>
              {healthScore}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Servings: </span>
              {servings}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Ready in: </span>
              {readyInMinutes} minutes
            </div>
          </div>

          <div className="">
            <div
              className="text-gray-700 text-2xl leading-10 mt-8"
              dangerouslySetInnerHTML={{ __html: summary }}
            ></div>
          </div>

          {/* Ingredients */}
          <div className="mt-12">
            <h2 className="text-3xl font-semibold text-gray-900">
              Ingredients
            </h2>
            <ul className="list-disc list-inside mt-8 text-gray-700 text-xl space-y-3">
              {extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="mt-12">
            <h2 className="text-3xl font-semibold text-gray-900">
              Instructions
            </h2>
            {analyzedInstructions.length > 0 ? (
              <ol className="list-decimal list-inside mt-8 text-gray-700 text-xl space-y-4">
                {analyzedInstructions[0].steps.map((step) => (
                  <li key={step.number}>{step.step}</li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-700 mt-4">No instructions available.</p>
            )}
          </div>
        </div>

        {/* Similar Recipes Section */}
        <SimpleRecipes />
      </div>
    </div>
  );
};

export default RecipePage;
