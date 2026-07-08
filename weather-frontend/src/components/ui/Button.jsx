function Button({
    children,
    onClick,
    className = "",
    type = "button",
}) {

    return (

        <button
            type={type}
            onClick={onClick}
            className={`
                px-5
                py-3
                rounded-xl
                font-semibold
                transition
                duration-200
                hover:scale-105
                active:scale-95
                ${className}
            `}
        >

            {children}

        </button>

    );

}

export default Button;