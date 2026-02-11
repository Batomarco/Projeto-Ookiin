import '../styles/starRating.sass'

const StarRating = ({ rating, onRate }) => {

    return (
        <>
            <div className="star-rating">
                {Array.from({ length: 5 }, (_, i) => {
                    const value = i + 1;
                    const active = value <= rating;

                    return (
                        <button
                            key={value}
                            type="button"
                            className={`star ${active ? "active" : ""}`}
                            onClick={() => onRate(value === rating ? 0 : value)}
                            aria-label={`Avaliar com ${value} estrela${value > 1 ? "s" : ""}`}
                        >
                            ★
                        </button>
                    );
                })}
            </div>
        </>
    )
}

export default StarRating