import { useEffect, useRef, useState } from "react";
import "../styles/editListModal.sass"

function EditListModal({ isOpen, onClose, urlsObjetos, onSave }) {
    const [draft, setDraft] = useState([]);
    const dragIndex = useRef(null);

    useEffect(() => {
        if (isOpen) setDraft(urlsObjetos);
    }, [isOpen, urlsObjetos]);

    if (!isOpen) return null;

    function onDragStart(i) {
        dragIndex.current = i;
    }

    function onDrop(i) {
        const from = dragIndex.current;
        if (from === null || from === i) return;

        setDraft((prev) => {
            const next = [...prev];
            const [moved] = next.splice(from, 1);
            next.splice(i, 0, moved);
            return next;
        });

        dragIndex.current = null;
    }

    function handleSave() {
        onSave?.(draft);
    }

    return (
        <>
            <div className="edit-modal-overplay" onClick={onClose}>
                <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
                    <button id="close-btn" type="button" onClick={onClose} aria-label="Fechar">
                        <i className="fas fa-times"></i>
                    </button>

                    <h2>Editar ordem da lista</h2>
                    <h4>Não esqueça de salvar!!</h4>

                    <ul className="edit-object-list">
                        {draft.map((obj, i) => (
                            <li
                                key={obj.i}
                                draggable
                                onDragStart={() => onDragStart(i)}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={() => onDrop(i)}
                                className="edit-item"
                                title="Arraste para reordenar"
                            >
                                <span className="handle"></span>
                                <span className="text">
                                    {i + 1}. {obj.nome?.trim() ? obj.nome : "(Sem nome)"}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <button className="btn-sim" type="button" onClick={handleSave}>
                        Salvar
                    </button>
                </div>
            </div>
        </>
    )
}

export default EditListModal;