import { useEffect, useMemo, useState } from "react"

import '../styles/editImageModal.sass'

const EditImageModal = ({ isOpen, onClose, onSave }) => {

    const [novaURL, setNovaURL] = useState("");
    const [formato, setFormato] = useState("");

    useEffect(() => {
        if (isOpen) {
            setNovaURL("");
            setFormato("");
        }
    }, [isOpen]);

    const erro = useMemo(() => {
        if (!isOpen) return "";

        const url = novaURL.trim();
        if (!url) return "";

        //Valida URL
        try {
            new URL(url);
        } catch {
            return "Insira uma URL válida."
        }

        if (!formato) return "Escolha um formato antes de salvar.";

        if (!url.toLowerCase().endsWith("." + formato)) {
            return `A URL precisa terminar com .${formato}`;
        }

        return "";
    }, [isOpen, novaURL, formato]);

    if (!isOpen) return null;

    function handleSave() {
        const url = novaURL.trim();
        if (!url) return alert("Insira uma URL válida.")
        if (erro) return alert(erro);

        onSave(url);
    }

    return (
        <>
            <div className="editar-image-modal" role="dialog" aria-modal="true">
                <div className="modal-content-image">
                    <label htmlFor="novaURL">Digite a nova URL:</label>
                    <input
                        type="text"
                        id="novaURL"
                        value={novaURL}
                        onChange={(e) => setNovaURL(e.target.value)}
                    />

                    <div id="select-container-url">
                        <select className="formato-url" value={formato} onChange={(e) => setFormato(e.target.value)}>
                            <option value="">Formato</option>
                            <option value="jpg">.jpg</option>
                            <option value="png">.png</option>
                            <option value="jpeg">.jpeg</option>
                            <option value="jpe">.jpe</option>
                        </select>
                    </div>

                    {erro && <small style={{color: "salmon"}}>{erro}</small>}

                    <div style={{display: "flex", gap: 10, marginTop: 12}}>
                        <button className="btn-nao" type="button" onClick={onClose}>
                            Cancelar
                        </button>
                        <button className="btn-sim" type="button" onClick={handleSave}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditImageModal