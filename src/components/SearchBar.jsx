export default function SearchBar({ placeholder = 'Search a pokemon', onChange = () => { } }) {
  return (
    <div className="pokemon__search-container">
      <input className="pokemon__search-input" type="text" placeholder={placeholder} onChange={onChange}></input>
    </div>
  )
}