import { useMemo, useState, useEffect } from "react";
import StarRating from "./StarRating";

import '../styles/catalogItem.sass'

const CatalogItem = ({ objectList, onOpenMenu, onUpdate, onRate, borderColor }) => {
    
    const LIMITE = 14;

    //Texto "limpo" (remove tags)
    const nomeLimpo = useMemo(() => {
        if(!objectList.nome) return "";
        return objectList.nome.replace(/<[^>]+/g, "").trim()
    }, [objectList.nome]);

    const { nomeMostrado, precisaTruncar } = useMemo(() => {
        if (!nomeLimpo) return { nomeMostrado: "", precisaTruncar: false };
        const trunc = nomeLimpo.slice(0, LIMITE);
        const precisa = nomeLimpo.length > LIMITE;
        return { nomeMostrado: precisa ? trunc + "..." : trunc, precisaTruncar: precisa };
    }, [nomeLimpo]);

    //Controla o input quando está editando (Só se não tiver nome)
    const [draft, setDraft] = useState("");

    function salvarNome() {
        const novo = draft.trim();
        onUpdate(objectList.id, novo);
        setDraft("");
    }

    useEffect(() => {
        if (!objectList.nome) setDraft("");
    }, [objectList.nome]);

    const naoVisto = objectList.checkboxState?.some((state) => state === false);

    const isGolden = objectList.rating === 5;

    return (
        <>
            <div className='object-container'>

                {naoVisto && (
                    <i className="bookmark-icon fas fa-bookmark" title="Marcador"></i>
                )}

                <img
                    src={objectList.url}
                    className={`object-image ${isGolden ? "golden-border" : ""}`}
                    style={!isGolden ? { background : borderColor, borderColor } : undefined}
                    alt={objectList.nome || "Imagem do catálogo"}
                    onClick={() => onOpenMenu(objectList)}
                />

                <div className="info-objeto">
                    <div className="colocacao-objeto">
                        <span>{objectList.colocacao}.</span>
                        {/*✅ Nome */}
                        {nomeLimpo ? (
                            <div
                                className={`object-name ${precisaTruncar ? "truncated-text" : ""}`}
                                title={precisaTruncar ? nomeLimpo : undefined}
                            >
                                {nomeMostrado}
                            </div>
                        ) : (
                            <input
                                className="object-name"
                                value={draft}
                                placeholder="Digite o nome"
                                onChange={(e) => setDraft(e.target.value)}
                                onBlur={salvarNome}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        e.currentTarget.blur();
                                    }
                                }}
                            />
                        )}
                    </div>
                </div>

                <StarRating
                    rating={objectList.rating || 0}
                    onRate={(value) => onRate(objectList.id, value)}
                />
            </div>
        </>
    );
}

export default CatalogItem