function History({ history }) {

    return (

        <div className="bg-white dark:bg-slate-800 dark:text-white rounded-2xl shadow-xl p-6">

            <h2 className="text-2xl font-bold mb-5">

                📜 Recent Searches

            </h2>

            {

                history.length === 0 ?

                (

                    <div className="text-gray-500 dark:text-gray-300">

                        No searches yet.

                    </div>

                )

                :

                history.map(item => (

                    <div

                        key={item.id}

                        className="flex justify-between items-center border-b py-4 hover:bg-slate-50 px-2 rounded-lg transition"

                    >

                        <div>

                            <h3 className="font-semibold text-lg">

                                📍 {item.city_name}

                            </h3>

                            <p className="text-sm text-gray-500 dark:text-gray-300">

                                {new Date(item.searched_at).toLocaleString()}

                            </p>

                        </div>

                    </div>

                ))

            }

        </div>

    );

}

export default History;