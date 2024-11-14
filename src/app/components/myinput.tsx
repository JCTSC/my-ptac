type MyInputProp = {
    value: string
}

const MyInput: React.FC<MyInputProp> = ({value}) => {
    return (
        <input value={value} placeholder="CICADA-3301" />
    )
}

export default MyInput;