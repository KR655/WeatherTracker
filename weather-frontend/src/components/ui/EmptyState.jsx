function EmptyState({

    title,

    description

}) {

    return (

        <div className="text-center py-12 text-gray-500">

            <h2 className="text-xl font-bold">

                {title}

            </h2>

            <p className="mt-2">

                {description}

            </p>

        </div>

    );

}

export default EmptyState;