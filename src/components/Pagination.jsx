export default function Pagination({ goToPrevPage, goToNextPage }) {
  return (
    <div className="pokemon__pagination-container">
      {goToPrevPage && <button className="pokemon__pagination--btn" onClick={goToPrevPage}>{'<'}</button>}
      {goToNextPage && <button className="pokemon__pagination--btn" onClick={goToNextPage}>{'>'}</button>}
    </div>
  )
}