function Input({

    value,

    onChange,

    placeholder,

    type = "text",

    className = "",

}) {

    return (

        <input

            value={value}

            onChange={onChange}

            placeholder={placeholder}

            type={type}

            className={`
                w-full
                border
                rounded-xl
                p-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
                ${className}
            `}

        />

    );

}

export default Input;