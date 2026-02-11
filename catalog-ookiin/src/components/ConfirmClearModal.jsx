import { useEffect, useRef } from "react"
import "../styles/confirmClearModal.sass"

const ConfirmClearModal = ({ isOpen, onConfirm, onCancel }) => {

    const panelRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return
        function onKeyDown(e) {
            if (e.key === "Escape") onCancel?.();
        }
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;
    
    return (
        <>
            <div
                id="modalConfirmacao"
                className="modal"
                onClick={(e) => {
                    if (panelRef.current && !panelRef.current.contains(e.target)) onCancel?.();
                }}
            >
                <div className="modal-content" ref={panelRef}>
                    <p>
                        Tem certeza de que deseja remover todos os itens da lista?
                        <br />
                        Isso irá <b>APAGAR PERMANENTEMENTE</b> todos os itens.
                    </p>

                    <div className="modal-buttons">
                        <button className="btn-sim" type="button" onClick={onConfirm}>
                            Sim
                        </button>
                        <button className="btn-nao" type="button" onClick={onCancel}>
                            Não
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmClearModal