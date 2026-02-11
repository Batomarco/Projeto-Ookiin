import '../styles/sideMenu.sass'

const SideMenu = ({ isOpen, objectList, onClose, onClosed, onEditImage, onEditNome, onDelete, onToggleSeason, onAddSeason, onRemoveSeason, onUpdateNotes }) => {


    return (
        <>
            <div 
                className='menu-lateral' 
                style={{width: isOpen ? "250px" : "0"}}
                onTransitionEnd={(e) => {
                    if (e.propertyName !== "width") return

                    if (!isOpen) onClosed?.();
                }}
            >
                <a 
                    href='javascript:void(0)' 
                    className='close-btn' 
                    onClick={(e) => { e.preventDefault(); onClose(); }}
                >
                    &times;
                </a>

                <h1 id='menu-lateral-objeto'>{objectList?.nome || ""}</h1>

                <h3 id="menu-lateral-title">Temporadas:</h3>
                <p id='menu-lateral-subtitle'>Aqui você pode marcar as temporadas assistidas:</p>

                <div 
                    className='checkbox-container'
                    style={
                        (objectList?.checkboxCount || 0 ) > 10
                            ? { overflowY: "auto", maxHeight: 210 }
                            : undefined
                    }
                >
                    {Array.from({ length: objectList?.checkboxCount || 0 }, (_, i) => (
                        <div className='checkbox-item' key={i}>
                            <input 
                                type='checkbox' id={`option-${objectList?.id}-${i + 1}`}
                                checked={!!objectList?.checkboxState?.[i]}
                                onChange={(e) => onToggleSeason?.(i, e.target.checked)}
                            />
                            <label className='checkbox-label' htmlFor={`option-${objectList?.id}-${i + 1}`}>
                                Temporada {i + 1}
                            </label>
                        </div>
                    ))}
                </div>

                <div id='adicionar-remover'>
                    <button id='addCheckboxBtn' type='button' onClick={onAddSeason}>
                        Adicionar Temporadas
                    </button>

                    <button className='remove-checkbox-btn' type='button' onClick={onRemoveSeason}>
                        X
                    </button>
                </div>
                
                <div className='items-container'>
                    <button 
                        className='menu-item edit-image-icon' onClick={onEditImage}
                    >
                            <i className='fas fa-file-image'></i>
                            <span>Editar Imagem</span>
                    </button>

                    <button
                        className='menu-item edit-icon' onClick={onEditNome}
                    >
                            <i className='fas fa-edit'></i>
                            <span>Editar Nome</span>
                    </button>

                    <button
                        className='menu-item delete-icon' onClick={onDelete}
                    >
                            <i className='fas fa-trash-alt'></i>
                            <span>Remover</span>
                    </button>
                </div>

                <div className='post-it'>
                    <h4>Anotações</h4>
                    <textarea
                        placeholder='Escreva algo...'
                        value={objectList?.notes || ""}
                        onChange={(e) => onUpdateNotes?.(e.target.value)}
                    />
                </div>
            </div>
        </>
    )
}

export default SideMenu