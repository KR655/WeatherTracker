function FavoriteList({ favorites, onRemove }) {

    if (!favorites.length) {
        return (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-3">⭐ Favorites</h2>
                <p className="text-gray-500 dark:text-gray-300">No favorites added yet.</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-4">
                ⭐ Favorites
            </h2>

            {favorites.map((item) => (

                <div
                    key={item.id}
                    className="flex justify-between items-center border-b py-3"
                >

                    <div>

                        <h3 className="font-semibold">
                            {item.city_name}
                        </h3>

                        <p>{item.temperature}</p>

                        <p className="text-sm text-gray-500 dark:text-gray-300">
                            {item.condition}
                        </p>

                    </div>

                    <button
                        onClick={() => onRemove(item.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Remove
                    </button>

                </div>

            ))}

        </div>
    );
}

export default FavoriteList;