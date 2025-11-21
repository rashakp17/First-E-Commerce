const Input =({label, type ,value ,onChange , placeholder})=>{
  return (
    <div className="flex flex-col w-full mb-4">
      <label className="texr-sm font-medium text-gray-700">{label}</label>

      <input
       type={type}
       value={value}
       onChange={onChange}
       placeholder={placeholder}
       required
       className="mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"/>
    </div>
  )
}

export default Input ;