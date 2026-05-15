import { useEffect, useState } from "react";
import { getCategories } from "../../api/categories.api";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getCategories()
            .then((data) => {
                setCategories(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Categories</h2>

            {categories.map((c) => (
                <div key={c.id}>
                    {c.name}
                </div>
            ))}
        </div>
    );
}

export default CategoryList