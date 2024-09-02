export const handleSaveInput = (e:any, setValue: (_: string) => void) =>{
    const input = e.target.value.toUpperCase();
    setValue(input)
}