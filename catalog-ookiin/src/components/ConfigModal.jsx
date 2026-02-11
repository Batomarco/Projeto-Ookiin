import { useEffect, useRef } from 'react';

import '../styles/configModal.sass'

const ConfigModal = ({ isOpen, onClose, borderColor, onChangeBorderColor, onOpenEditList, hasItems, onOpenConfirmClear }) => {
    const panelRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        function onKeyDown(e) {
            if (e.key === "Escape") onClose?.();
        }

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null

    return (
        <div 
            id='config-modal'
            onClick={(e) => {
                if (panelRef.current && !panelRef.current.contains(e.target)) {
                    onClose?.();
                }
            }}
        >
            <div id="config-config" ref={panelRef}>
                <button id='close-btn' type='button' onClick={onClose}>
                    <i className='fas fa-times'></i>
                </button>

                <h1>Configurações</h1>
                <h2>Personalize suas opções</h2>

                <p className='color-option'>
                    Cor da borda:
                    <input 
                        id='border-color' type='color' value={borderColor}
                        onChange={(e) => onChangeBorderColor(e.target.value)}
                    
                    />
                </p>

                <p className='edit-object-list'>
                    Editar ordem da lista:
                    <button id='open-list' type='button' onClick={onOpenEditList}>
                        <i className='fas fa-pencil-alt'></i>
                    </button>
                </p>

                <br />

                {hasItems && (
                    <button id='btnRemoverTudo' type='button' onClick={onOpenConfirmClear}>
                        Remover Tudo
                    </button>
                )}
            </div>

        </div>
    );
}

export default ConfigModal